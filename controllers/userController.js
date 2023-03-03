const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const createError = require("http-errors");
const jwt = require('jsonwebtoken')
const { genAccessToken, genRefreshToken } = require('../helpers/JWT')
const createHttpError = require('http-errors')


const profile = async (req, res, next) => {
    try {
        const profile = await User.findOne({ _id: req.user._id }).select({ name: 1, email: 1, phone: 1 })

        res.status(200).json({ success: true, profile, message: "Authenticated to profile route" })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = {

    profile,
    
}