import { Reset } from '../models';
import { Types } from 'mongoose';
import { DatabaseConnectionError } from '@aashas/common';

/**
 * Creates reset link if not already exists
 * @param email email id
 */
export const initiateReset = async (email: string) => {
  try {
    const resetID = Types.ObjectId().toHexString();

    /**
     * check for existing document with given email
     */

    const exists = await Reset.findOne({ email });

    /**
     *  if document already exists return the available reset ID
     */

    if (exists) return exists;

    /**
     *   if document doesn't exist create a new record
     */

    const resetDocument = await new Reset({ uid: resetID, email }).save();

    return resetDocument;
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
