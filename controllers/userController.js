const UserModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const createError = require("http-errors");
const jwt = require('jsonwebtoken')
const createHttpError = require('http-errors')


const profile = async (req, res, next) => {
    try {
        const profile = await UserModel.findOne({ _id: req.user._id })

        res.status(200).json({ success: true, profile, message: "user  profile" })
    } catch (error) {
        console.log(error);
        next(error)
    }
}


const updateUser = async (req, res,next) => {

    const userId  = req.params.id;
    try {
        const User = await UserModel.findById(userId);
        if (User._id == req.user._id) {
            await User.update(req.body);
            res.status(200).json({ success: true, message: "User Details updated" })
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
};

const allUser = async (req, res, next) => {
    try {
        if ("640706d85e745adee6a75d89" == req.user._id) {

            const profile = await UserModel.find()

            res.status(200).json({ success: true, profile, message: "All user  profile" })
        } else {
            res.status(403).json("Action forbidden");
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const block = async (req, res,next) => {

    const userId  = req.params.id;
    
    try {
        const User = await UserModel.findById(userId);
        

        if ("640706d85e745adee6a75d89" == req.user._id) {
            await User.updateOne({ $set: {block:true }});
            res.status(200).json({ success: true, message: "User Blocked" })
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
};

const unblock = async (req, res,next) => {

    const userId  = req.params.id;
    
    try {
        const User = await UserModel.findById(userId);
        

        if ("640706d85e745adee6a75d89" == req.user._id) {
            await User.updateOne({ $set: {block:false }});
            res.status(200).json({ success: true, message: "User UnBlocked" })
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
};


module.exports = {

    profile,
    updateUser,

    allUser,
    block,
    unblock

}