import { ServerError } from '@aashas/common';
import bcrypt from 'bcrypt';

/**
 * Creates a hash for the entered password
 * @param pass user password
 */
export const hashPassword = async (pass: string): Promise<string> => {
  const salt = 10;
  try {
    const hash = await bcrypt.hash(pass, salt);
    return hash;
  } catch (error) {
    throw new ServerError(error);
  }
};

/**
 * returns a boolean by matching password and hash
 * @param pass user password
 * @param hash hashed password
 */
export const compareHash = async (
  pass: string,
  hash: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(pass, hash);
    return match;
  } catch (error) {
    throw new ServerError(error);
  }
};
