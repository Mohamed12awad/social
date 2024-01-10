const config = require("../config");
const nodemailer = require("nodemailer");

// Create a transporter for sending emails using Gmail

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mailer.u,
    pass: config.mailer.p,
  },
});

// Function to send a professional welcome email to a new user
const sendWelcomeEmail = (userEmail, userName, token) => {
  const verificationLink = `http://localhost:5000/api/users/verify/${token}`;

  const mailOptions = {
    from: config.mailer.u,
    to: userEmail,
    subject: "Welcome to Our Blog App!",
    html: `
      <h1>Welcome, ${userName}!</h1>
      <p>Dear ${userName},</p>
      <p>Thank you for signing up for our blog app. We're thrilled to have you on board!</p>
      <p>You've taken the first step towards a world of great content. Start exploring, sharing, and creating amazing blog posts.</p>
      <p>Feel free to reach out to us if you have any questions or need assistance. Enjoy your blogging journey with us!</p>
      <p>Please click <a href="${verificationLink}">here</a> to verify your email.
      <p>Best regards,<br/>The Blog App Team</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = {
  transporter,
  sendWelcomeEmail,
};
