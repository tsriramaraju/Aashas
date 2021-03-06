import { Schema, model } from 'mongoose';
import {
  AccountDoc,
  AccountModel,
  authType,
  DatabaseConnectionError,
  emailAttrs,
  facebookAttrs,
  googleAttrs,
  mobileAttrs,
} from '@aashas/common';

const accountSchema = new Schema(
  {
    name: String,
    googleID: { type: String, unique: true, sparse: true },
    facebookID: { type: String, unique: true, sparse: true },
    emailVerified: {
      type: String,
      enum: ['pending', 'yes', 'no'],
      default: 'no',
    },
    mobileVerified: {
      type: String,
      enum: ['pending', 'yes', 'no'],
      default: 'no',
    },
    email: { type: String, unique: true, sparse: true },
    mobile: { type: Number, unique: true, sparse: true },
    password: String,
    isAdmin: { type: Boolean, default: false },
    authType: {
      type: Number,
      enum: [
        authType.email,
        authType.facebook,
        authType.google,
        authType.mobile,
      ],
      required: true,
    },
    lastLogin: {
      type: Date,
      required: true,
    },
  },
  {
    autoIndex: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

accountSchema.statics.emailBuild = (attrs: emailAttrs) => {
  return new Account(attrs);
};
accountSchema.statics.mobileBuild = (attrs: mobileAttrs) => {
  return new Account(attrs);
};
accountSchema.statics.googleBuild = (attrs: googleAttrs) => {
  return new Account(attrs);
};
accountSchema.statics.facebookBuild = (attrs: facebookAttrs) => {
  return new Account(attrs);
};

const Account = model<AccountDoc, AccountModel>('account', accountSchema);

Account.on('index', function (err) {
  if (err) {
    throw new DatabaseConnectionError(err.message);
  }
});

export { Account };
