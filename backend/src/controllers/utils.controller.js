import User from "../models/user.model.js";

export const purchaseItem = async (req, res) => {
    const { itemPrice, itemName, userId } = req.body;
    const user = await User.findById(userId);

    if(user.coins < itemPrice){
        return res.status(400).json({ message: "Not enough coins!" });
    }

    user.coins -= itemPrice;
    user.assets.push(itemName);
    await user.save();

    return res.json({ message: `Successfully purchased ${itemName}!` });
}

export const streakLeaderBoard = async (req, res) => {
    const response = await User.find({})
        .select('name level bountiesClaimed streak')
        .sort({ streak: -1 }) // high to low

    return res.status(200).json({
        data: response,
        message: "Top user with highest streak"
    })
};

export const bountyLeaderBoard = async (req, res) => {
    const response = await User.find({})
        .select('name level bountiesClaimed streak')
        .sort({ bountiesClaimed: -1 })

    return res.status(200).json({
        data: response,
        message: "Top user with higest bounties claimed"
    })
}