const userdataModel = require("../Models/userDetails");
const moment = require("moment"); // Add this line at the top of your file if using moment.js



exports.fetchingData =async (req, res) => {
  const {email, deviceId} = req.body

  console.log(req.body);
  

  try {
    const user = await userdataModel.findOne({email})
    const iduser = await userdataModel.findOne({deviceId})

    if(!user && !iduser) {
      console.log('invalid user request');
      return res.status(404).json({ success: false, message: "User not found" });
      
    }else {
      
      return res.status(200).json({ success: true, message: "user found",user:user, iduser:iduser });

    }

    

  }catch(err) {
    console.log('userdata fetching failed');
    return res.status(500).json({ success: false, message: "Server error" });
  }
};






exports.editProfile = async (req, res) => {
  console.log(req.body);
  
  const { name, DOB, phone, gender, nationality, city, pincode,email, deviceId } = req.body;

  if (
    name.trim() === "" ||
    DOB.trim() === "" ||
    phone.trim() === "" ||
    gender.trim() === "" ||
    nationality.trim() === "" ||
    city.trim() === "" ||
    pincode.trim() === ""
  ) {
    return res.status(400).json({ success: false, message: "All fields are mandatory" });
  } else if (name.length <= 2) {
    return res.status(400).json({ success: false, message: "Name must contain 3 characters" });
  } else if (phone.length !== 10) {
    return res.status(400).json({ success: false, message: "Phone number must be 10 digits" });
  } else if (pincode.length <= 5) {
    return res.status(400).json({ success: false, message: "Invalid pincode entered" });
  } else {
    try {
      const user = await userdataModel.findOne({ $or: [{ email }, { deviceId }] });

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });

      } else {
        // Convert DOB from string to Date object (using moment.js)
        const formattedDOB = moment(DOB, "DD/MM/YYYY").toDate(); // This converts the string to a Date object

        // Update user data
        user.name = name;
        user.DOB = formattedDOB;
        user.phone = phone;
        user.gender = gender;
        user.nationality = nationality;
        user.city = city;
        user.pincode = pincode;
        await user.save();
        
        return res.status(200).json({ success: true, message: "Profile updated successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "User update failed" });
    }
  }
};


exports.FetchUser = (req,res) => {
  const {deviceId} = req.body
  console.log('here');
  
  console.log(deviceId);
  
}
