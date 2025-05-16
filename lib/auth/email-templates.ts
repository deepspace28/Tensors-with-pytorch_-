export function getOTPEmailTemplate(otp: string): { subject: string; text: string; html: string } {
  const subject = "Your Synaptiq Verification Code"

  const text = `
Your verification code for Synaptiq is: ${otp}

This code will expire in 10 minutes and can only be used once.
If you didn't request this code, please ignore this email.

- The Synaptiq Team
`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Synaptiq Verification Code</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      padding: 20px;
    }
    .code {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 5px;
      text-align: center;
      margin: 30px 0;
      color: #000;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Your Verification Code</h2>
    <p>Use the following code to verify your email address on Synaptiq:</p>
    <div class="code">${otp}</div>
    <p>This code will expire in 10 minutes and can only be used once.</p>
    <p>If you didn't request this code, please ignore this email.</p>
  </div>
  <div class="footer">
    <p>&copy; ${new Date().getFullYear()} Synaptiq. All rights reserved.</p>
  </div>
</body>
</html>
`

  return { subject, text, html }
}
