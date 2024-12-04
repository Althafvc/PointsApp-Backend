    const express = require('express')
    const router = express.Router()
    const authController = require('../Controller/AuthController')


    router.post('/verifyemail',authController.phoneVerification)
    router.post('/postotp',authController.otpverification)
    router.post('/check-user',authController.checkUser)

    

    module.exports = router