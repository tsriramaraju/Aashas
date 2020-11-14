import mongoose from 'mongoose';
import { verification } from '@aashas/common';

/**
 * Payload structure for requests body
 */
interface emailPayload {
  name: string;
  email: string;
  password: string;
}

/**
 * Payload structure for requests body
 */
interface mobilePayload {
  name: string;
  mobile: number;
}

/**
 * JWT payload structure
 */
interface jwtPayload {
  id: mongoose.Types.ObjectId;
  name: string;
  email?: string;
  emailVerified: verification;
  mobileVerified: verification;
}
export { emailPayload, mobilePayload, jwtPayload };
