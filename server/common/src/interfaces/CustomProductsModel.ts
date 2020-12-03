import { Model, Types, Document } from 'mongoose';
import { size } from '..';
import { outfit, productAttrs } from './ProductsModel';

/**
 * An interface that describes the properties
 * that are required to create a new Custom Product model
 */
interface customProductsAttrs extends productAttrs {
  refImages: String[];
  userId?: Types.ObjectId;
}

/**
 * An interface that describes the properties
 * that a Custom Product Model has
 */
interface CustomProductModel extends Model<CustomProductDoc> {
  build(attrs: customProductsAttrs): CustomProductDoc;
  findByEvent(event: {
    id: Types.ObjectId;
    version: number;
  }): Promise<CustomProductDoc | null>;
}

/**
 * An interface that describes the properties
 * hat a Custom Product Document has
 */
interface CustomProductDoc extends Document {
  id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  description: string;
  size: size[];
  price: number;
  color: string;
  quantity: number;
  version: number;
  refImages: String[];
  outfit: outfit;
  keywords: string[];
  gender: 'male' | 'female';
  images: string[];
  discount: number;
  inOffer: boolean;
  isNewProduct: boolean;
  designerCollection: boolean;
  trending: boolean;
}

export { CustomProductDoc, CustomProductModel, customProductsAttrs };
