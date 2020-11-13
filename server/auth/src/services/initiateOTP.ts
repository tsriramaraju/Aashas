import { Account, OTP } from '../models';
import { generateOTP } from '../utils';
import { DatabaseConnectionError, verification } from '@aashas/common';
import { Types } from 'mongoose';

/**
 * Creates an OTP record if not exists
 * @param id email id or mobile no.
 * @param name Name of the user
 */
export const initiateOTP = async (
  id: string | number,
  name: string,
  userID?: Types.ObjectId
) => {
  try {
    const otpValue = generateOTP();

    /**
     * check for existing document with given id
     */

    const exists =
      typeof id == 'string'
        ? await OTP.findOne({ email: id })
        : await OTP.findOne({ mobile: id });

    /**
     *  if document already exists return the available OTP
     */

    if (exists) return exists;

    /**
     *   if document doesn't exist create a new record
     */

    if (userID) {
      const user = await Account.findById(userID);

      /**
       * updates verification status upon checking
       */
      typeof id == 'string'
        ? user?.emailVerified === verification.no &&
          (await user.update({
            emailVerified: verification.pending,
            email: id,
          }))
        : user?.mobileVerified === verification.no &&
          (await user.update({
            mobileVerified: verification.pending,
            mobile: id,
          }));
    }
    const otpDocument =
      typeof id == 'string'
        ? await new OTP({ otp: otpValue, name, email: id }).save()
        : await new OTP({ otp: otpValue, name, mobile: id }).save();

    return otpDocument;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
