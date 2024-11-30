let givenOtp = ''
const mailotp = require('../Middlewares/otpmailer')
const otpMailer = require('../Utilities/otpmailer')
const userdataModel = require('../Models/userDetails')


exports.phoneVerification  = (req,res) => {


   
    const {email, phone} = req.body.data



    

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const phoneregex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

 if(!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email'});

 } else if (!phoneregex.test(phone)) {
   return res.status(400).json({ success: false, message: 'Please enter a valid phone number'});

 }
 
 else {
   givenOtp = mailotp.otp
   otpMailer(givenOtp,email)
       return res.status(200).json({ success: true, message: 'Email verified successfully' });

 }
    
} 

exports.otpverification = async (req, res) => { 
   
   const { otpCode, email, phone } = req.body;
   const receivedOtp = otpCode.join('');   

   if (givenOtp != receivedOtp) {      
     return res.status(400).json({ success: false, message: 'Invalid OTP' });

   } else {


     try {
       // Check if the user already exists
       const oldUser = await userdataModel.findOne({ email });
 
       if (oldUser) {
         return res.status(400).json({ success: false, message: 'User already exists' });
       } else {
         // Create a new user
         const newSchema = new userdataModel({
           email: email,
           phone,phone
         });
 
         await newSchema.save();
         console.log('User saved successfully');
       }
       return res.status(200).json({ success: true, message: 'OTP verified successfully' });
       
     } catch (err) {
       console.error('Error saving user:', err);
       return res.status(500).json({ success: false, message: 'Server error' });
     }

   }
 };



 