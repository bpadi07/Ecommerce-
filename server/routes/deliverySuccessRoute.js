import express from "express";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();



router.post('/', async (req, res) => {
 const { email } = req.body;
  const user = await User.findOne({ email }) // Assuming the email is sent in the request body

  try {
   
  
        await sendEmail({
          email: user.email,
          subject:"Payment success",
          message: "Your Payment is successfully done",
        });
        res.status(200).json({
          status: "success",
          message: "Email sent successfully",
        });
    
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "Error in sending email",
      });
    }
  }
  
);

export default router;
