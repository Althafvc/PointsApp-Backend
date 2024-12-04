let givenOtp = ''
const mailotp = require('../Middlewares/otpmailer')
const otpMailer = require('../Utilities/otpmailer')
const userdataModel = require('../Models/userDetails')


exports.phoneVerification  = (req,res) => {

    const {email, phone} = req.body.data

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const phoneregex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

      try {
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
      }catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error', err});


      }
    
} 


exports.otpverification = async (req, res) => { 
   
   const { otpCode, email, phone, deviceId } = req.body;
   
   const receivedOtp = otpCode.join('');   

   if (givenOtp != receivedOtp) {      
     return res.status(400).json({ success: false, message: 'Invalid OTP' });

   } else {

     try {
       // Check if the user already exists
       const User = await userdataModel.findOne({ deviceId });

       if (User) {
        
       User.email = email,
       User.phone= phone
       await User.save();
         console.log('email and phone saved successfully');
       return res.status(200).json({ success: true, message: 'OTP verified and data successfully' });
       
     } else {      
      return res.status(404).json({ success: false, message: 'user not found' });

     }

    }catch (err) {
       console.error('Error saving user:', err);
       return res.status(500).json({ success: false, message: 'Server error' });
     }

   }
 };


 exports.checkUser =  async (req, res) => {
  
  const { deviceId } = req.body; // Assuming deviceId is sent
  
   try {

    const user = await userdataModel.findOne({deviceId})
    
    if (user) {
      console.log(1);
      
      return res.status(200).json({ isNewUser: false });
    } else {
      console.log(2);
      const newSchema = new userdataModel({
        deviceId,
      });
      await newSchema.save();
      console.log(3);
      
      return res.status(200).json({ isNewUser: true });
    }

   }catch (err) {
    console.log('userchecking failed',err);
    
   }
  
};




 