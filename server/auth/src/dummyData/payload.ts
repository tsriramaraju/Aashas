import { verification } from '@aashas/common';
import { Types } from 'mongoose';

export const payloadData = {
  id: Types.ObjectId(),
  name: 'john doe',
  email: 'john@test.com',
  emailVerified: verification.yes,
  mobileVerified: verification.no,
  isAdmin: false,
};
