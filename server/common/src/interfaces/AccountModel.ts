import { Types, Model, Document } from 'mongoose';
import { authType, verification } from './enums';

/**
 * An interface that describes the properties
 * that are required to create a new User Account
 */
interface emailAttrs {
  email: string;
  password: string;
  name: string;
  authType: authType.email;
  lastLogin: string;
  emailVerified: verification.pending;
}
interface mobileAttrs {
  name: string;
  mobile: number;
  authType: authType.mobile;
  lastLogin: string;
  mobileVerified: verification.yes;
}
interface googleAttrs {
  authType: authType.google;
  lastLogin: string;
  emailVerified: verification.yes;
  googleID: string;
  email: string;
  name: string;
}
interface facebookAttrs {
  authType: authType.facebook;
  lastLogin: string;
  emailVerified: verification.yes;
  facebookID: string;
  email: string;
  name: string;
}

/**
 * An interface that describes the properties
 * that a Account Model has
 */
interface AccountModel extends Model<AccountDoc> {
  emailBuild(attrs: emailAttrs): AccountDoc;
  mobileBuild(attrs: mobileAttrs): AccountDoc;
  googleBuild(attrs: googleAttrs): AccountDoc;
  facebookBuild(attrs: facebookAttrs): AccountDoc;
}

/**
 * An interface that describes the properties
 * hat a Account Document has
 */
interface AccountDoc extends Document {
  // id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  mobile: number;
  authType: authType;
  lastLogin: string;
  emailVerified: verification;
  mobileVerified: verification;
  isAdmin: boolean;
  googleID: string;
  facebookID: string;
}

export {
  emailAttrs,
  mobileAttrs,
  facebookAttrs,
  googleAttrs,
  AccountDoc,
  AccountModel,
};
//
