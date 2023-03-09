const router = require('express').Router()
const { PostImage, saveCard, getSavedCard, getSingleSavedCard, getCard, getSingleCard, getAllCard, createCard, updateCard, removeCard, updateCardStatus } = require('../controllers/cardController')
const { verifyJwt } = require('../middleware/verify_jwt')
const multer = require('multer')
const ImageModel = require('../model/imageModel')




const storage = multer.memoryStorage()
const upload = multer({ storage: storage })





//saved card routes
router.post('/saveCard', verifyJwt, saveCard)
router.get('/getSavedCard', verifyJwt, getSavedCard)
router.get('/getSingleSavedCard/:id', verifyJwt, getSingleSavedCard)
router.put('/updateCard/:id', verifyJwt, updateCard)
router.delete('/removeCard/:id', verifyJwt, removeCard)

//book card routes
router.post('/createCard',verifyJwt, upload.single('image'), createCard)
router.get('/getcreatedCard', verifyJwt, getCard)
router.get('/getcreatedSingleCard/:id', verifyJwt, getSingleCard)




//admin routes
router.get('/getAllCard', verifyJwt, getAllCard)
router.put('/updateStatusCard/:id', verifyJwt, updateCardStatus)




module.exports = router