import Issue from '../models/issue.model.js';
import User from '../models/user.model.js';

const normalizeOutput = (value) => {
    return String(value)
        .replace(/\s+/g, " ")
        .trim();
};

export const solveIssue = async (req, res) => {
    try {
        const { issueId, generatedOutput, userId } = req.body;

        if (!issueId || generatedOutput == null || !userId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const issue = await Issue.findById(issueId);
        const user = await User.findById(userId);

        if (!issue || !user) {
            return res.status(404).json({ message: "Issue or User not found" });
        }

        const normalizedOutput = normalizeOutput(generatedOutput);
        const normalizedExpected = normalizeOutput(issue.expectedOutput);

        if (issue.category === 'Logic' || issue.category === 'Syntax') {
            const validation = normalizedOutput === normalizedExpected;
            if (!validation) {
                return res.status(400).json({ message: "Incorrect output." });
            }
        } else {
            const validation = normalizedOutput.toLowerCase().includes(normalizedExpected.toLowerCase());
            if (!validation) {
                return res.status(400).json({ message: "Output does not meet the expected criteria." });
            }
        }

        // eligibility for rewards
        let rewardsEarned = false;

        // issue is unsolved and user hasn't solved it yet
        if (issue.status === 'Unsolved' && !user.completedProblems.includes(issueId)) {

            // update user rewards and level
            user.coins += issue.rewards.coins;
            user.xp += issue.rewards.xp;
            user.bountiesClaimed += 1;
            const newLevel = Math.floor(user.xp / 500) + 1;

            if (newLevel > user.level) {
                user.level = newLevel;
            }

            // update issue status
            issue.status = 'Solved';
            issue.solvedBy = user._id;
            issue.solvedAt = new Date();

            rewardsEarned = true;
        }

        // updating user history
        if (!user.completedProblems.includes(issueId)) {
            user.completedProblems.push(issueId);

            const today = new Date();
            today.setHours(0, 0, 0, 0); // start of the day

            const lastActivity = user.lastActivityDate ? new Date(user.lastActivityDate) : null;

            if (lastActivity) {
                lastActivity.setHours(0, 0, 0, 0);
            }
            if (!lastActivity) {
                user.streak = 1;
            } else {
                const diffTime = today - lastActivity;
                const diffDays = diffTime / (1000 * 60 * 60 * 24);

                if (diffDays === 1) {
                    // come one day later
                    user.streak += 1;
                } else if (diffDays > 1) {
                    user.streak = 1; // missed day
                }
            }

            user.lastActivityDate = new Date();
        }

        // SAVE changes to database
        await user.save();
        await issue.save();

        if (rewardsEarned) {
            return res.json({
                success: true,
                message: `Bounty Claimed! +${issue.rewards.coins} coins +${issue.rewards.xp} XP. You were the first to solve!`
            });
        } else {
            return res.json({
                success: true,
                message: "Correct! (Bounty was already claimed, no coins awarded)"
            });
        }
    } catch (error) {
        console.error("Error in solveIssue:", error);
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};

export const fetchAllIssue = async (req, res) => {
    const data = await Issue.find({});
    return res.status(200).json({
        data,
        message: "All questions fetched"
    })
}

export const fetchIssue = async (req, res) => {
    const { id } = req.params;

    const issue = await Issue.findById(id);
    if (!issue) {
        return res.status(404).json({
            message: "No such issue found"
        })
    }

    return res.status(200).json({
        issue,
        message: "Issue fetched successfully"
    })
}