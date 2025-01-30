import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  try {
    // Validate required parameters
    if (!to || !subject || !text) {
      throw new Error("Missing required email parameters (to, subject, text )");
    }

    // Set up transporter with defaults
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      logger: true, // Enable debug logs
      debug: true, // Show SMTP traffic
    });
    
    


    // Configure mail options
    const mailOptions = {
      from: `"MyCampusHome.lk" <${process.env.SMTP_USER || "default@example.com"}>`, // Fallback sender
      to,
      subject,
      text,
    };


    // Send the email
    const info = await transporter.sendMail(mailOptions);
console.log(info.response); // Check this for Gmail's server response


    // Log success
    console.log(`Email sent successfully to ${to}. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    // Log the error with detailed context
    console.error(`Error sending email to ${to}:`, error.message, {
      stack: error.stack,
      smtpConfig: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
      },
    });
    throw new Error("Failed to send email. Please check the configuration and parameters.");
  }
};
