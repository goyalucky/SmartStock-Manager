import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const addUser = async (req,res) => {
    try {
        const {name,email,password,address,role} = req.body;

        const exUser = await User.findOne({email});
        if(exUser){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
           name,
           email,
           password: hashedPassword,
           address,
           role
        });
        await newUser.save();
        res.status(201).json({success: true,message:"User added successfully"});
    } catch (error) {
        console.error('Error adding users:', error);
        res.status(500).json({success: false,message: 'Server error'});
    }
}

export const getUsers = async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).json({success: true,users});
    } catch (error) {
        console.log('Error fetching users:', error);
        return res.status(500).json({success: false,message: 'Server error in getting categories'});
    }
}

export const deleteUser = async (req,res) => {
    try {
        const {id} = req.params;
        const existingCategory = await User.findById(id);
        if(!existingCategory){
            return res.status(404).json({success: false,message:"User not found"});
        }
        await User.findByIdAndDelete(id);
        return res.status(200).json({success: true,message:"user deleted successfully"});
    } catch (error) {
        console.log('Error deleting user:',error);
        return res.status(500).json({success: false,message: 'Server Error'});
    }
}