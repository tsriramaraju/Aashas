import { OTP, Account } from '../models';
import {
  BadRequestError,
  verification,
  authType,
  ResourceNotFoundError,
  DatabaseConnectionError,
} from '@aashas/common';

/**
 * Creates a user record or updates verification status on record or returns existing record depending on the input id
 * @param otpValue 4 digit otp value
 * @param id email id or password
 */
export const verifyOTP = async (otpValue: number, id: string | number) => {
  const otpData = await OTP.findOne(
    typeof id == 'string' ? { email: id } : { mobile: id }
  );

  //Makes sure that OTP is not expired
  if (!otpData)
    throw new ResourceNotFoundError('OTP expired, plz generate OTP again');

  //Makes sure that OTP belongs to user
  if (otpData.otp != otpValue) throw new BadRequestError('Invalid OTP');

  try {
    //Update verification status if id is email
    if (typeof id == 'string') {
      return await Account.findOneAndUpdate(
        { email: id },
        { emailVerified: verification.yes }
      );
    }

    const user = await Account.findOne({ mobile: id });

    //Return user, if the account already exists with the mobile no.
    if (user) {
      if (user.mobileVerified == verification.pending) {
        user.mobileVerified = verification.yes;
        return await user.save();
      }
      return user;
    }

    //Create new user record if no record is found with verified status as "yes"
    return await Account.mobileBuild({
      authType: authType.mobile,
      lastLogin: Date.now().toString(),
      mobile: id,
      name: otpData.name!,
      mobileVerified: verification.yes,
    }).save();
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
