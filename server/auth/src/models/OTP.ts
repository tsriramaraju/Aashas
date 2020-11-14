import { Schema, model } from 'mongoose';
import { otpAttrs, OTPDoc, OTPModel } from '@aashas/common';

const otpSchema = new Schema(
  {
    otp: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    mobile: { type: String, unique: true, sparse: true },
    date: { type: Date, default: Date.now(), expires: '15m' },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

otpSchema.statics.build = (attrs: otpAttrs) => {
  return new OTP(attrs);
};

const OTP = model<OTPDoc, OTPModel>('otp', otpSchema);

export { OTP };
