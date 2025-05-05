export const verifyEmailTemplate = (
  url: string
) => ({
  subject: "Confirm your SecureAuth account",
  text: `Please verify your email address by clicking the following link: ${url}`,
  html: `
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      body, html {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.05);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            padding: 32px 20px;
            text-align: center;
            color: white;
        }
        
        .logo {
            display: inline-block;
            margin-bottom: 16px;
        }
        
        .logo img {
            height: 48px;
        }
        
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: -0.5px;
        }
        
        .content {
            padding: 40px;
            text-align: center;
        }
        
        .content h2 {
            font-size: 22px;
            font-weight: 600;
            color: #1e293b;
            margin: 0 0 16px 0;
        }
        
        .content p {
            font-size: 15px;
            color: #64748b;
            margin: 0 0 24px 0;
        }
        
        .verification-code {
            background-color: #f1f5f9;
            border-radius: 8px;
            padding: 16px;
            margin: 24px 0;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 2px;
            color: #1e293b;
            display: inline-block;
        }
        
        .button {display: inline-block;padding: 16px 32px;background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);color: white !important;font-weight: 600;text-decoration: none;border-radius: 8px;margin: 16px 0;transition: all 0.2s ease;box-shadow: 0px 4px 6px rgba(79, 70, 229, 0.15);}
        
        .button:hover {transform: translateY(-2px);box-shadow: 0px 6px 12px rgba(79, 70, 229, 0.2);}
        
        .footer {padding: 24px;text-align: center;font-size: 13px;color: #94a3b8;border-top: 1px solid #e2e8f0;}
        .footer a {color: #64748b;text-decoration: none;}
        .footer a:hover {color: #4f46e5;text-decoration: underline;}
        .disclaimer {font-size: 12px;color: #94a3b8;margin-top: 24px;padding-top: 16px;border-top: 1px solid #f1f5f9;}
        
        @media only screen and (max-width: 600px) {
            .container {
                margin: 0;
                border-radius: 0;
            }
            
            .content {
                padding: 30px 20px;
            }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Confirm Your Email Address</h1>
        </div>
        <div class="content">
          <h2>Welcome to SecureAuth!</h2>
          <p>Thank you for creating an account. To complete your registration, please verify your email address by clicking the button below:</p>
          <a href="${url}" class="button">Confirm account</a>
          <p>This verification link will expire in 24 hours. If you didn't request this email, you can safely ignore it.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} SecureAuth. All rights reserved.</p>
          <p>
            <a href="#">Help Center</a> | 
            <a href="#">Privacy Policy</a> | 
            <a href="#">Terms of Service</a>
          </p>
          <p class="disclaimer">This email was sent to you as part of your account registration. If you believe you received this in error, please contact our support team.</p>
        </div>
      </div>
    </body>
    </html>
  `,
});

export const passwordResetTemplate = (
  url: string,
  brandColor: string = "#2563EB"
) => ({
  subject: "Reset Your Password",
  text: `To reset your password, please click the following link: ${url}`,
  html: `
    <html><head><style>
      body, html { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); }
      .header { background-color: ${brandColor}; font-size: 24px;  font-weight:bold; color: #ffffff; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; }
      .header img { max-width: 40px; margin-bottom: 10px; }
      .content { padding: 20px; text-align: center; }
      .content h1 { font-size: 24px; color: #333333; }
      .content p { font-size: 16px; color: #666666; margin: 10px 0 20px; }
      .button { display: inline-block; padding: 15px 25px; font-size: 16px; font-weight: bold; background-color: ${brandColor};  color: #fff !important; border-radius: 5px; text-decoration: none; margin-top: 20px; }
      .footer { font-size: 14px; color: #999999; text-align: center; padding: 20px; }
    </style></head><body>
      <div class="container">
        <div class="header">Squeezy</div>
        <div class="content">
          <h1>Reset Your Password</h1>
          <p>We received a request to reset your password. Click the button below to proceed with resetting your password.</p>
          <a href="${url}" class="button">Reset Password</a>
          <p>If you did not request a password reset, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
        </div>
      </div>
    </body></html>
  `,
});