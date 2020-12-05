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
  id: string;
  name: string;
  email?: string;
  emailVerified: verification;
  mobileVerified: verification;
  isAdmin: boolean;
  mobile?: number;
}
export { emailPayload, mobilePayload, jwtPayload };
