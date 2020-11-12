/**
 * creates a 4 digit OTP
 */
export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 8000);
};
