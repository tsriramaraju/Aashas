import { Model, Document } from 'mongoose';
import { ProductDoc, CustomProductDoc } from '..';
import { authType } from './enums';

/**
 * Interface address
 */

interface address {
  _id?: string;
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
  id: string;
  name: string;
  email?: string;
  mobile?: number;
  image?: string;
  isAdmin: boolean;
  authType: authType;
  addresses?: address[];
  defaultAddress?: address;
  cart?: string[];
  orders?: string[];
  favourites?: string[];
  customProducts?: string[];
}

/**
 * An interface that describes the properties
 * that a User Model has
 */
interface UserModel extends Model<UserDoc> {
  build(attrs: userAttrs): UserDoc;
  findByEvent(event: { id: string; version: number }): Promise<UserDoc | null>;
}

/**
 * An interface that describes the properties
 * hat a User Document has
 */
interface UserDoc extends Document {
  name: string;
  email?: string;
  mobile?: number;
  image?: string;
  isAdmin: boolean;
  version: number;
  authType: authType;
  addresses?: address[];
  defaultAddress?: address;
  cart?: ProductDoc[] | string;
  orders?: ProductDoc[] | string;
  favourites?: ProductDoc[] | string;
  customProducts?: CustomProductDoc[] | string;
}

export { userAttrs, UserDoc, UserModel, address };
