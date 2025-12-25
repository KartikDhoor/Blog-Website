const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});
// 🚀 Neuradhoor GLASS OTP - FULLY RESPONSIVE (Mobile + Desktop)
const sendOtpEmailVerification = async (email, otp) => {
  try {
    const mailOptions = {
      from: `"Neuradhoor 👋" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Your Neuradhoor Verification Code",
      replyTo: process.env.EMAIL_USER,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>Neuradhoor OTP</title>
  <style>
    /* RESET & BASE */
    * { margin:0; padding:0; box-sizing:border-box; }
    body { 
      margin:0; padding:20px; 
      background:linear-gradient(135deg,#fff5e6 0%,#ffe8cc 100%);
      font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
    }
    
    /* CONTAINER */
    .container { 
      max-width:600px; margin:0 auto; 
      background:rgba(255,255,255,0.95);
      box-shadow:0 20px 40px rgba(255,165,0,0.15);
      border-radius:24px;
      border:1px solid rgba(255,255,255,0.3);
      backdrop-filter:blur(20px);
      overflow:hidden;
    }
    
    /* HEADER */
    .header { 
      text-align:center; padding:30px 20px; 
      background:linear-gradient(135deg,rgba(255,193,7,0.1),rgba(255,152,0,0.1));
      border-radius:20px 20px 0 0;
      margin:0;
      border-bottom:1px solid rgba(255,193,7,0.2);
      box-shadow:0 8px 32px rgba(255,193,7,0.1);
      backdrop-filter:blur(10px);
    }
    
    /* OTP CARD */
    .otp-card { 
      padding:40px 24px; margin:30px 20px; 
      background:linear-gradient(135deg,rgba(255,255,255,0.8),rgba(255,255,255,0.4));
      border-radius:24px;
      border:1px solid rgba(255,255,255,0.5);
      box-shadow:0 20px 40px rgba(0,0,0,0.08),inset 0 1px 0 rgba(255,255,255,0.6);
      backdrop-filter:blur(20px);
      text-align:center;
    }
    
    /* OTP BOX */
    .otp-box { 
      background:linear-gradient(135deg,#ffab40,#ff6b35);
      border-radius:20px; padding:30px 20px; margin:0 0 25px 0;
      box-shadow:0 16px 32px rgba(255,107,53,0.3),inset 0 1px 0 rgba(255,255,255,0.3);
      position:relative; overflow:hidden;
    }
    
    .otp-glow { 
      position:absolute; top:0; left:0; right:0; height:4px;
      background:linear-gradient(90deg,transparent,#fff,transparent);
    }
    
    .otp-code { 
      font-size:48px; font-weight:800; color:#fff; 
      letter-spacing:8px; margin:0; line-height:1;
      text-shadow:0 4px 12px rgba(0,0,0,0.2);
    }
    
    /* BUTTONS */
    .buttons { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
    .btn-primary, .btn-secondary { 
      padding:12px 28px; border-radius:12px; font-weight:600; font-size:14px;
      text-decoration:none; display:inline-block; transition:all 0.3s ease;
    }
    .btn-primary { 
      background:linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,255,255,0.7));
      color:#ff6b35; border:1px solid rgba(255,107,53,0.2);
      box-shadow:0 8px 20px rgba(0,0,0,0.1); backdrop-filter:blur(10px);
    }
    .btn-secondary { 
      background:transparent; color:#ffab40; 
      border:2px solid rgba(255,171,64,0.4); backdrop-filter:blur(10px);
    }
    
    /* FOOTER */
    .footer { 
      text-align:center; padding:25px 20px; 
      background:rgba(255,255,255,0.6); border-radius:0 0 20px 20px;
      border-top:1px solid rgba(255,255,255,0.4);
      box-shadow:inset 0 1px 0 rgba(255,255,255,0.8); backdrop-filter:blur(10px);
    }
    
    /* MOBILE RESPONSIVE */
    @media screen and (max-width: 600px) {
      body { padding:10px !important; }
      .container { margin:10px !important; border-radius:20px !important; }
      .header { padding:25px 15px !important; }
      .otp-card { 
        margin:20px 10px !important; padding:30px 20px !important; 
      }
      .otp-code { 
        font-size:36px !important; letter-spacing:4px !important;
      }
      .buttons { 
        flex-direction:column !important; width:100% !important; 
      }
      .btn-primary, .btn-secondary { 
        width:100% !important; text-align:center; padding:14px 20px !important;
      }
    }
    
    /* DARK MODE SUPPORT */
    @media (prefers-color-scheme: dark) {
      body { background:linear-gradient(135deg,#1a1a1a,#2d2d2d) !important; }
      .container { background:rgba(30,30,30,0.95) !important; }
    }
    
    /* OUTLOOK FIX */
    .mso-container { width:100% !important; }
  </style>
</head>
<body>
  <div class="container">
    
    <!-- HEADER -->
    <div class="header">
      <h1 style="color:#ff6b35;font-size:28px;font-weight:700;margin:0 0 10px 0;letter-spacing:-0.5px;">
        Welcome to <span style="background:linear-gradient(135deg,#ff6b35,#ffab40);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Neuradhoor</span> ✨
      </h1>
      <p style="color:#666;font-size:16px;margin:0;line-height:1.5;">Complete your account verification</p>
    </div>

    <!-- OTP CARD -->
    <div class="otp-card">
      
      <!-- OTP BOX -->
      <div class="otp-box">
        <div class="otp-glow"></div>
        <div class="otp-code">${otp}</div>
        <div style="position:absolute;bottom:8px;right:20px;font-size:12px;color:rgba(255,255,255,0.8);font-weight:500;">Copy code</div>
      </div>

      <!-- INFO -->
      <div style="margin:0 0 25px;">
        <p style="color:#ff6b35;font-size:16px;font-weight:600;margin:0 0 8px 0;">
          ⏰ Expires in <strong>5 minutes</strong>
        </p>
        <p style="color:#888;font-size:14px;margin:0;line-height:1.5;">
          Enter this code in the app to verify your email address. Don't share it with anyone.
        </p>
      </div>

      <!-- BUTTONS -->
      <div class="buttons">
        <a href="#" class="btn-primary">📱 Open App</a>
        <a href="#" class="btn-secondary">Need help?</a>
      </div>
      
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <p style="color:#999;font-size:13px;margin:0 0 8px 0;">
        🔒 This is a secure one-time code. Only enter it on the official Neuradhoor app.
      </p>
      <p style="color:#bbb;font-size:12px;margin:0;">
        Didn't request this? <a href="#" style="color:#ff8c42;font-weight:500;">Secure your account</a>
      </p>
    </div>

  </div>
</body>
</html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("🚀 Neuradhoor OTP sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ OTP email failed:", error.message);
    return false;
  }
};


const sendOtpForEmailVerification=async(email,otp)=>{
  try {
    const mailOptions = {
      from: `${process.env.EMAIL_USER}`,
      to: email,
      subject: "Your OTP Code for Forget Password",
      replyTo: process.env.EMAIL_USER, // Allows users to reply
      html: `
        <h2>User Forget Password Otp For NERUADHOOR!</h2>
        <p>Your OTP code is: <b>${otp}</b></p>
        <p>This OTP will expire in <b>5 minutes</b>.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" OTP sent:", info.messageId);
    return true;
  } catch (error) {
    console.error(" Error sending OTP email:", error.message);
    return false;
  }
}



const contactAdminTemplate = ({ firstName, lastName, email, phone, message }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>New Contact Message - Neuradhoor</title>
</head>
<body style="margin:0;padding:0;background:#fff7ec;font-family:Segoe UI,Tahoma,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:linear-gradient(135deg,#ff6b35,#ffab40);padding:20px 24px;border-radius:18px 18px 0 0;color:#fff;">
      <h2 style="margin:0;font-size:22px;">New Contact Message</h2>
      <p style="margin:4px 0 0;font-size:14px;">Neuradhoor contact form</p>
    </div>

    <div style="background:#ffffff;border-radius:0 0 18px 18px;box-shadow:0 10px 25px rgba(0,0,0,0.08);padding:24px;">
      <p style="margin:0 0 12px;font-size:15px;">You received a new message from the website contact form:</p>

      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:16px;">
        <tr>
          <td style="padding:6px 0;font-weight:600;width:120px;">Name</td>
          <td style="padding:6px 0;">${firstName} ${lastName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-weight:600;">Email</td>
          <td style="padding:6px 0;">${email}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-weight:600;">Phone</td>
          <td style="padding:6px 0;">${phone || "–"}</td>
        </tr>
      </table>

      <div style="margin-top:10px;">
        <p style="margin:0 0 6px;font-weight:600;font-size:14px;">Message:</p>
        <div style="padding:12px 14px;border-radius:12px;background:#fff7ec;border:1px solid #ffe0b3;font-size:14px;white-space:pre-line;">
          ${message}
        </div>
      </div>

      <p style="margin-top:20px;font-size:12px;color:#888;">Sent automatically from the Neuradhoor contact page.</p>
    </div>
  </div>
</body>
</html>
`;

const contactUserTemplate = ({ firstName }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>We received your message</title>
</head>
<body style="margin:0;padding:0;background:#fff5e6;font-family:Segoe UI,Tahoma,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:#ffffff;border-radius:20px;box-shadow:0 10px 25px rgba(0,0,0,0.08);padding:24px 24px 20px;border:1px solid #ffe0b3;">
      <h2 style="margin:0 0 10px;background:linear-gradient(135deg,#ff6b35,#ffab40);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:22px;">
        Thanks for reaching out 👋
      </h2>
      <p style="margin:0 0 10px;font-size:15px;color:#444;">
        Hi ${firstName || "there"},
      </p>
      <p style="margin:0 0 10px;font-size:15px;color:#555;">
        We have received your message and the Neuradhoor team will get back to you within the next few days.
      </p>
      <p style="margin:0 0 10px;font-size:15px;color:#555;">
        If your request is urgent, you can reply to this email with more details.
      </p>
      <p style="margin:16px 0 0;font-size:13px;color:#777;">
        — Neuradhoor Team
      </p>
    </div>
  </div>
</body>
</html>
`;
module.exports = { sendOtpEmailVerification,contactAdminTemplate,contactUserTemplate };
