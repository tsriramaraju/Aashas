import { Model, Types, Document } from 'mongoose';
import { size } from '..';
import { outfit, productAttrs } from './ProductsModel';

/**
 * An interface that describes the properties
 * that are required to create a new Custom Product model
 */
interface customProductsAttrs<T extends outfit> extends productAttrs<T> {
  refImages: String[];
}

/**
 * An interface that describes the properties
 * that a Custom Product Model has
 */
interface CustomProductModel<T extends outfit>
  extends Model<CustomProductDoc<T>> {
  build(attrs: customProductsAttrs<T>): CustomProductDoc<T>;
}

/**
 * An interface that describes the properties
 * hat a Custom Product Document has
 */
interface CustomProductDoc<T extends outfit> extends Document {
  id: Types.ObjectId;
  title: string;
  description: string;
  size: size[];
  price: number;
  color: string;
  quantity: number;

  refImages: String[];
  outfit: T;
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
