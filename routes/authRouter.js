const router = require('express').Router()
const { signup, login, refreshToken, logout } = require('../controllers/authController')




router.post('/signup',signup)
router.post('/login',login)
router.post('/refresh-token',refreshToken)
router.delete('/logout',logout)


module.exports = router