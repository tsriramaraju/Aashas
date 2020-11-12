import mongoose from 'mongoose';
import { authType, verification } from './interfaces';

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
  verified: verification.pending;
}
interface mobileAttrs {
  name: string;
  mobile: number;
  authType: authType.mobile;
  lastLogin: string;
  verified: verification.yes;
}
interface OAuthAttrs {
  authType: authType.facebook | authType.google;
  lastLogin: string;
  verified: verification.yes;
}

/**
 * An interface that describes the properties
 * that a Account Model has
 */
interface AccountModel extends mongoose.Model<AccountDoc> {
  emailBuild(attrs: emailAttrs): AccountDoc;
  mobileBuild(attrs: mobileAttrs): AccountDoc;
  oauthBuild(attrs: OAuthAttrs): AccountDoc;
}

/**
 * An interface that describes the properties
 * hat a Account Document has
 */
interface AccountDoc extends mongoose.Document {
  id: mongoose.Types.ObjectId;
  email?: string;
  password?: string;
  name: string;
  mobile?: number;
  authType: authType;
  lastLogin: string;
  verified: verification;
  isAdmin: 'yes' | 'no';
}

export { emailAttrs, mobileAttrs, OAuthAttrs, AccountDoc, AccountModel };
