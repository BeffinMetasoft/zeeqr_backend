const router = require('express').Router()
const { signup,adminlogin, login, refreshToken, logout } = require('../controllers/authController')




router.post('/signup',signup)
router.post('/login',login)
router.post('/refresh-token',refreshToken)
router.post('/logout',logout)
router.post('/adminlogin',adminlogin)


module.exports = router