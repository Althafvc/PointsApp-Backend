const express = require('express')
const router = express.Router()
const userController = require('../Controller/UserController')
const { route } = require('./CommonRouter')

router.post('/profile',userController.editProfile)
router.post('/fetchuser',userController.fetchingData)
router.post('/getuser',userController.FetchUser)



module.exports = router