import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import Otp from '../models/otp.model.js';

function isEmailValid(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const sendEmail = async (to, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        });

        const mailOptions = {
            from: '"CodeQuest Team" <no-reply@yourdomain.com>',
            to: to,
            subject: "Your CodeQuest Verification Code",
            text: `Hi,

Thank you for signing up for CodeQuest.

Your One-Time Password (OTP) is: ${otp}

This code will expire in 5 minutes.

If you did not request this, please ignore this email.

- CodeQuest Team`,
            html: `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2 style="color:#333;">CodeQuest Email Verification</h2>
    <p>Hi,</p>
    <p>Thank you for signing up for <b>CodeQuest</b>.</p>
    <p>Your One-Time Password (OTP) is:</p>
    <h1 style="letter-spacing: 3px; color:#2c3e50;">${otp}</h1>
    <p>This code will expire in <b>5 minutes</b>.</p>
    <p>If you did not request this, you can safely ignore this email.</p>
    <br/>
    <p style="font-size:12px; color:gray;">
      © ${new Date().getFullYear()} CodeQuest. All rights reserved.
    </p>
  </div>`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Sending to email failed", error);
        throw new Error("Failed to send an otp.")
    }
};

export const sendOtp = async (req, res) => {
    const { email } = req.body;
    if (!isEmailValid(email)) {
        return res.status(400).json({
            message: "Invalid email address"
        });
    }

    const existing = await Otp.findOne({ email });

    const resendCooldownMs = 60 * 1000;
    if (existing && Date.now() - existing.lastSentAt < resendCooldownMs) {
        return res.status(429).json({
            message: "Wait before requesting OTP again"
        })
    };

    const otp = crypto.randomInt(100000, 1000000);
    const otpHash = await bcrypt.hash(otp.toString(), 10);

    await Otp.findOneAndUpdate(
        { email },
        {
            otpHash,
            expiresAt: Date.now() + 5 * 60 * 1000,
            attempts: 0,
            lastSentAt: Date.now()
        },
        { upsert: true }
    );

    await sendEmail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });
};

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email });
    if (!record) {
        return res.status(400).json({ message: "OTP expired or not found" });
    }

    if (record.attempts >= 5) {
        return res.status(429).json({ message: "Too many attempts try again later" });
    }

    if (record.expiresAt < Date.now()) {
        return res.status(400).json({ message: "OTP expired, send again to verify" })
    }

    const isMatch = await bcrypt.compare(otp.toString(), record.otpHash);
    if (!isMatch) {
        record.attempts += 1;
        await record.save();
        return res.status(400).json({ message: "Incorrect OTP" });
    }

    await Otp.deleteOne({ email });

    return res.status(200).json({ message: "Email is verified" });
}