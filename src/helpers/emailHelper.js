const nodemailer = require('nodemailer');

// Function to send an email
async function sendEmail(to, subject, text, html) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host : 'smtp.gmail.com',
        port : 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'mailtestforproject2@gmail.com',
            pass: 'ulegrrgqhyasdgcl'
        }
    });

    let mailOptions = {
        from: 'mailtestforproject2@gmail.com', // Sender address
        to: to, // List of recipients
        subject: subject, // Subject line
        text: text ,// Plain text body
        html: html // html body
    };

    try {
        // Send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error occurred while sending email:', error);
        throw error;
    }
}

module.exports = { sendEmail };
