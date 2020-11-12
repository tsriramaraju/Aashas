import {
  AccountDoc,
  AccountModel,
  authType,
  emailAttrs,
  mobileAttrs,
  OAuthAttrs,
} from '@aashas/common';
import { Schema, model } from 'mongoose';

const accountSchema = new Schema(
  {
    name: String,
    verified: { type: String, enum: ['pending', 'yes', 'no'], default: 'no' },
    email: { type: String, unique: true, sparse: true },
    mobile: { type: Number, unique: true, sparse: true },
    password: String,
    isAdmin: { type: String, enum: ['yes', 'no'], default: 'no' },
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
accountSchema.statics.oauthBuild = (attrs: OAuthAttrs) => {
  return new Account(attrs);
};

const Account = model<AccountDoc, AccountModel>('account', accountSchema);

Account.on('index', function (err) {
  // if (err) {
  //   console.error('User index error: %s', err);
  // }
});

export { Account };
