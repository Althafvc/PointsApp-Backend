const express = require('express')
const router = express.Router()
const userController = require('../Controller/UserController')

router.post('/profile',userController.editProfile)
router.post('/fetchuser',userController.fetchingData)



module.exports = router