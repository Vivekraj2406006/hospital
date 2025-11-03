export const EMAIL_VERIFY_TEMPLATE = `
  <div style="font-family: Arial, sans-serif;">
    <h2>Email Verification</h2>
    <p>Your OTP for verifying your email is:</p>
    <h1 style="color: #4F46E5;">{{otp}}</h1>
    <p>This OTP is valid for {{minutesRemaining}} min {{secondsRemaining}} sec. Please do not share it with anyone.</p>
  <p>Thank you,<br/>SR EMERGENCY Team</p>
  </div>
`;

export const PASSWORD_RESET_TEMPLATE = `
  <div style="font-family: Arial, sans-serif;">
    <h2>Password Reset</h2>
    <p>Your OTP for resetting your password is:</p>
    <h1 style="color: #4F46E5;">{{otp}}</h1>
    <p>This OTP is valid for 15 minutes. Please do not share it with anyone.</p>
  <p>Thank you,<br/>SR EMERGENCY Team</p>
  </div>
`;
