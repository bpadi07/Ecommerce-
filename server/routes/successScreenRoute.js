import express from "express";

// import sendEmail from "./utils/sendEmail.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.post('/', async (req, res) => {
 const { email } = req.body; // Assuming the email is sent in the request body
 //const user=await User.findOne({email});
  try {
  const adminUser = await User.findOne({ isAdmin: true })
 
  if(adminUser){
    
       //const adminUser = await User.findOne({ email });
      
        await sendEmail({
          email: adminUser.email,
          //email:user.email,
          subject: "Payment success",
          message: "Payment is successfully done",
        });
        res.status(200).json({
          status: "success",
          message: "Email sent successfully",
        });
      } else {
        res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "Error in sending email",
      });
    }
   
   }
);

export default router;
