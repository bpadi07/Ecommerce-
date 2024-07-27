import nodemailer from "nodemailer"

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    
    service:"gmail",
    auth:{
      user:"jadhavsakshi218@gmail.com",
      pass: 'evgpyrjlvuferdhe',
    }
  })

  const mailOptions = {
    from: "Sakshi Jadhav <jadhavsakshi218@gmail.com>",
    // to:"sakshijadhav1034@gmail.com",
    to: options.email,
    subject: options.subject,
    
    text: options.message,
    //html:
  }

  await transporter.sendMail(mailOptions)
}

export default sendEmail
