import { Types } from 'mongoose';
import { authType } from './interfaces';

/**
 * Interface address
 */

interface address {
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
  loginType: authType;
  addresses?: address[];
  defaultAddress?: address;
  cart?: Types.ObjectId[];
  orders?: Types.ObjectId[];
  favourites?: Types.ObjectId[];
  customProducts?: Types.ObjectId[];
}
