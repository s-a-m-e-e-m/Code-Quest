import AvatarModel from "../models/avatar.model.js";
import UserModel from "../models/user.model.js";

export const getAllAvatars = async (req, res) => {
    try {
        const avatars = await AvatarModel.find();
        if(avatars.length === 0) {
            return res.status(404).json({ message: "No avatars found" });
        }
        return res.status(200).json({
            message: "Avatars retrieved successfully",
            avatars
        })
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const updateUserAvatar = async (req, res) => {
    const { userId } = req.params;
    const { avatar } = req.body;

    try {
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        user.profilePic = avatar || user.profilePic;
        await user.save();

        return res.status(200).json({
            message: "Avatar updated successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({ 
            message: "Server error", error: error.message
        })
    }
}