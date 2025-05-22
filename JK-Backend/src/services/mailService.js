const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.MAIL_USER, // Your email address
    pass: process.env.MAIL_PASS  // Your email password or app-specific password
  }
});

const sendMail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    text,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendMail };
