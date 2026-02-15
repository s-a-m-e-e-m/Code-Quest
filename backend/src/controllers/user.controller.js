import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
 
export const SignUp = async (req, res) => {
    const { name, email, password } = req.body;

    const isUserExists = await User.findOne({ email });
    if(isUserExists) {
        return res.status(400).json({
            message: "A user with this email id already exists"
        })
    }
    
    if(password.length <6){
        return res.status(400).json({
            message: "Password must be atleast 6 characters long"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.cookie('token',token, {
        httpOnly: true,
        maxAge: 7*24*60*60*1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });

    return res.status(201).json({
        message: "user created successfully",
        user: {
            name: name,
            email: email,
            _id: user._id
        }
    })
}

export const SignIn = async (req, res) => {
    const { email, password } = req.body;

    const isUserExists = await User.findOne({ email });
    if(!isUserExists){
        return res.status(400).json({
            message: "No such user exists"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, isUserExists.password);
    if(!isPasswordCorrect){
        return res.status(400).json({
            message: "Incorrect email or password"
        })
    }

    const token = jwt.sign({
        id: isUserExists._id
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 7*24*60*60*1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });

    return res.status(200).json({
        message: `Welcome back ${isUserExists.name}`,
        user: {
            name: isUserExists.name,
            email: isUserExists.email,
            _id: isUserExists._id
        }
    })
}

export const logoutUser = async (req, res) => {
    res.cookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        expires: new Date(0)
    }).clearCookie('token');

    return res.status(200).json({
        message: "logout successfully"
    })
}

export const getUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(404).json({ message: "User not found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id).select(" name email _id streak coins profilePic level xp bountiesClaimed completedProblems assets");

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            user
        })

    } catch (error) {
        return res.status(500).json({ message: "Some unexpected error occurred please try again later."})
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id).select(" name email _id profilePic streak coins level xp bountiesClaimed completedProblems assets description ");

    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
        user,
        message: "Profile fetched successfully"
    })
}

export const editUserDescription = async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    user.description = description || user.description;

    await user.save();

    return res.status(200).json({
        message: "Profile updated successfully",
        user
    })
}