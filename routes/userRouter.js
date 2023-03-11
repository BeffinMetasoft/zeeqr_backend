const router = require('express').Router()
const {profile,updateUser,allUser,block,unblock } = require('../controllers/userController')
const { verifyJwt } = require('../middleware/verify_jwt')



//user routes
router.get('/profile',verifyJwt,profile)
router.put('/update',verifyJwt,updateUser)
//admin routes
router.get('/allUser',verifyJwt,allUser)
router.put('/block/:id',verifyJwt,block)
router.put('/unblock/:id',verifyJwt,unblock)



module.exports = router