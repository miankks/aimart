import { User } from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.js';
import cloudinary from '../config/cloudinary.js';

export const register = async(req, res) => {
    try {
        const {name, password, email} = req.body;

        if (!name || !password || !email) {
            return res.status(401).json({message: "Pleavide all the details"})
        }

const existingUser= await User.findOne({email})
        if (existingUser) {
            return res.status(201).json({message: "User already exist"})
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        })
        const token = await jwt.sign({userId: user._id}, ENV.JWT_TOKEN);

        return res.status(201)
                .cookie("token", token, {maxAge: 1*24*60*60*1000, http: true, sameSite: "none"})
                .json({message: `Welcome ${user.name}`})

    } catch (error) {
        console.log(`error from registr controller ${error}`);
        
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(401).json({message: "Please provide correct details"})
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(401).json({message: "User does not exist"})
        }

        const isPasswordCorrect = bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(401).json({mesage: "Passwod is not correct."})
        }

        const token = await jwt.sign({userId: user._id}, ENV.JWT_TOKEN);

        if (user.email===ENV.ADMIN_EMAIL) {
        const token = await jwt.sign({userId: user._id}, ENV.JWT_TOKEN);
            return res.status(201)
                    .cookie("token", token, {maxAge: 1*24*60*60*1000, http: true, sameSite: "none"})
                    .json({message: `Welcome back Admin ${user.name}`})
        }
    } catch (error) {
        console.log(`Error from login ${error}`);
        
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId)

        if (!user) {
            return res.status(401).json({message: "User not found"})
        }

        return res.status(201).json(user)
    } catch (error) {
        console.log(`User is not available getUser ${error}`);
        
    }
}

export const getCartItem = async (req, res) => {
    try {
        const userId = req.id;

        const user = await User.findById(userId).populate("cartItem")
        if (!user) {
            return res.status(401).json({message: "User not found"})
        }

        return res.status(201).json(user)
    } catch (error) {
        console.log(`error from getCartItem, ${error}`);     
    }
}

export const updateProfile = async(req, res) => {
    try {
        const userId = req.id;
        const {name} = req.body;
        
        const updateData = {};
        if (req.file) {
            const base64 = `data: ${req.file.mimetype};base64, ${req.file.buffer.toString('base64')}` 

            const uploadRes = await cloudinary.uploader.upload(
                base64, {
                    folder: "ProfilePhoto"
                }
            )
        }
    } catch (error) {
        console.log(`error from update profile, ${error}`);
    }
}