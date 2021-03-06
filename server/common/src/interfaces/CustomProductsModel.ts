import { Model, Document } from 'mongoose';
import { size } from '..';
import { verification } from './enums';
import { outfit } from './ProductsModel';

/**
 * An interface that describes the properties
 * that are required to create a new Custom Product model
 */
interface customProductsAttrs {
  refImages: String[];
  userId?: string;
  title: string;
  description: string;
  size: size[];
  price: number;
  color: string;
  status: verification;
  outfit: outfit;
  gender: 'male' | 'female';
  images: string[];
}
interface customProductRequestAttrs {
  refImages: String[];
  userId?: string;
  title?: string;
  description?: string;
  size?: size[];
  color?: string;
  outfit?: outfit;
  gender?: 'male' | 'female';
  images?: string[];
  status: verification.pending;
}

/**
 * An interface that describes the properties
 * that a Custom Product Model has
 */
interface CustomProductModel extends Model<CustomProductDoc> {
  build(attrs: customProductsAttrs): CustomProductDoc;
  request(attrs: customProductRequestAttrs): CustomProductDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<CustomProductDoc | null>;
}

/**
 * An interface that describes the properties
 * hat a Custom Product Document has
 */
interface CustomProductDoc extends Document {
  userId: string;
  status: verification;
  title: string;
  description: string;
  size: size[];
  price: number;
  color: string;
  version: number;
  refImages: String[];
  outfit: outfit;
  gender: 'male' | 'female';
  images: string[];
}

export {
  CustomProductDoc,
  CustomProductModel,
  customProductRequestAttrs,
  customProductsAttrs,
};
