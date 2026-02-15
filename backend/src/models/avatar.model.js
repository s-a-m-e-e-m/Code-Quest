import mongoose from 'mongoose';

const avatarSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        default: 'https://ik.imagekit.io/glsrrntcvj/emptypicture.png'
    }
});

const Avatar = mongoose.model('Avatar', avatarSchema);

export default Avatar;