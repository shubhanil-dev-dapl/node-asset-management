const nodemailer = require('nodemailer');

// Function to send an email
async function sendEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password'
        }
    });

    let mailOptions = {
        from: 'your-email@gmail.com', // Sender address
        to: to, // List of recipients
        subject: subject, // Subject line
        text: text // Plain text body
    };

    try {
        // Send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error occurred while sending email:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

module.exports = { sendEmail };
