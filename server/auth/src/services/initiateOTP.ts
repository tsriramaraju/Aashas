import { Types } from 'mongoose';
import { generateOTP } from '../utils';
import { Account, OTP } from '../models';
import {
  DatabaseConnectionError,
  ResourceNotFoundError,
  verification,
} from '@aashas/common';

/**
 * Creates an OTP record if not exists
 * @param id email id or mobile no.
 * @param name Name of the user
 */
export const initiateOTP = async (
  id: string | number,
  name: string,
  userID?: string
) => {
  try {
    const otpValue = generateOTP();

    /**
     * check for existing document with given id
     */

    const exists = await OTP.findOne(
      typeof id == 'string' ? { email: id } : { mobile: id }
    );

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
      if (!user) {
        throw new ResourceNotFoundError('requesting user not found');
      }
      typeof id == 'string'
        ? user.emailVerified === verification.no &&
          (await user.updateOne({
            emailVerified: verification.pending,
            email: id,
          }))
        : user?.mobileVerified === verification.no &&
          (await user.updateOne({
            mobileVerified: verification.pending,
            mobile: id,
          }));
    }
    const otpDocument = await new OTP(
      typeof id == 'string'
        ? { otp: otpValue, name, email: id }
        : { otp: otpValue, name, mobile: id }
    ).save();

    return otpDocument;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
