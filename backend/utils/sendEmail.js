const nodemailer = require("nodemailer");

const sendEmail = async (options)=>{

    const transporter =nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            password:process.env.SMPT_PASSWORD,
            method:"PLAIN"
        }
    })

    const mailOptions ={
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }
      
  await  transporter.sendMail(mailOptions);

};

module.exports=sendEmail;