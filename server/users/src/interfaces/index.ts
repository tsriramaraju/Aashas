import { Types } from 'mongoose';
import { verification } from '@aashas/common';

/**
 * JWT payload structure
 */
interface jwtPayload {
  id: Types.ObjectId;
  name: string;
  email?: string;
  emailVerified: verification;
  mobileVerified: verification;
}
export { jwtPayload };
