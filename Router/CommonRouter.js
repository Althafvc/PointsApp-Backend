    const express = require('express')
    const router = express.Router()
    const authController = require('../Controller/AuthController')


    router.post('/verifyemail',authController.phoneVerification)
    router.post('/postotp',authController.otpverification)
    

    module.exports = router