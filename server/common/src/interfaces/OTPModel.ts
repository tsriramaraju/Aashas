import { Model, Document, Types } from 'mongoose';

/**
 * An interface that describes the properties
 * that are required to create a new OTP Document
 */
interface otpAttrs {
  otp: number;
  email?: string;
  mobile?: number;
  name?: string;
}

/**
 * An interface that describes the properties
 * that a OTP Model has
 */
interface OTPModel extends Model<OTPDoc> {
  build(attrs: otpAttrs): OTPDoc;
}

/**
 * An interface that describes the properties
 * hat a OTP Document has
 */
interface OTPDoc extends Document {
  id: Types.ObjectId;
  otp: number;
  email?: string;
  mobile?: number;
  name?: string;
}

export { OTPDoc, OTPModel, otpAttrs };
