import { Model, Types, Document } from 'mongoose';
import { authType } from './enums';

/**
 * Interface address
 */

interface address {
  _id?: Types.ObjectId;
  name: string;
  house: string;
  location: string;
  street: string;
  pin: number;
  city: string;
  state: string;
}

/**
 * An interface that describes the properties
 * that are required to create a new User model
 */
interface userAttrs {
  id: Types.ObjectId;
  name: string;
  email?: string;
  mobile?: number;
  image?: string;

  isAdmin: boolean;
  authType: authType;
  addresses?: address[];
  defaultAddress?: address;
  cart?: Types.ObjectId[];
  orders?: Types.ObjectId[];
  favourites?: Types.ObjectId[];
  customProducts?: Types.ObjectId[];
}

/**
 * An interface that describes the properties
 * that a User Model has
 */
interface UserModel extends Model<UserDoc> {
  build(attrs: userAttrs): UserDoc;
}

/**
 * An interface that describes the properties
 * hat a User Document has
 */
interface UserDoc extends Document {
  id: Types.ObjectId;
  name: string;
  email?: string;
  mobile?: number;
  image?: string;
  isAdmin: boolean;
  authType: authType;
  addresses?: address[];
  defaultAddress?: address;
  cart?: Types.ObjectId[];
  orders?: Types.ObjectId[];
  favourites?: Types.ObjectId[];
  customProducts?: Types.ObjectId[];
}

export { userAttrs, UserDoc, UserModel, address };
