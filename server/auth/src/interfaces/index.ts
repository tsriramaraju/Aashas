import { verification } from '@aashas/common';
import mongoose from 'mongoose';

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
  verified?: verification;
}
export { emailPayload, mobilePayload, jwtPayload };
