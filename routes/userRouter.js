const router = require('express').Router()
const {profile } = require('../controllers/userController')
const { verifyJwt } = require('../middleware/verify_jwt')




router.get('/profile',verifyJwt,profile)



module.exports = router