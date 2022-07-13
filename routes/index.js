const express = require('express')
const router = express.Router()

const saveCred = require('../controllers/saveCredentials')
const checkUser = require('../controllers/checkUser')
const updatePass = require('../controllers/updatePass')
const saveUpdateProfDetails = require('../controllers/saveUpdateProfDetails')
const getPic = require('../controllers/getPic')

var multer = require('multer')
var storage = multer.memoryStorage()
var uploadService = multer({
	storage : storage
})

router.post('/saveCred', saveCred)
router.post('/checkUser', checkUser)
router.post('/updatePass', updatePass)
router.post('/saveUpdateProfDetails', uploadService.single('pic'), saveUpdateProfDetails)
router.post('/getPic', getPic)

module.exports = router
