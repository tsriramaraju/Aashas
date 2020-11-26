import { Model, Document, Types } from 'mongoose';
import { categories } from '..';
import { size } from './enums';

interface outfit {
  type: categories;
  occasion?: {};
}

interface maleType {
  type: categories.men;
  occasion: {
    party?: 'sherwani' | 'Kurta pyjama' | 'Jackets';
    groom?: 'sherwani' | 'Kurta pyjama';
    groomsmen?: 'sherwani' | 'Kurta pyjama' | 'Jackets';
    casual?: 'sherwani' | 'Kurta pyjama' | 'Jackets';
  };
}
interface femaleType {
  type: categories.women;
  occasion: {
    party?: 'Lehengas' | 'Kurtas' | 'Sarees';
    bridal?: 'Lehengas' | 'Kurtas';
    bridesmaid?: 'Lehengas' | 'Kurtas' | 'Sarees';
    casual?: 'Lehengas' | 'Kurtas' | 'Sarees';
  };
}
interface kidsType {
  type: categories.kids;
  occasion: {
    party?: 'Lehengas' | 'Kurtas' | 'sherwani' | 'Jackets';
    birthday?: 'Lehengas' | 'Kurtas';
    weddings?: 'Lehengas' | 'Kurtas' | 'sherwani' | 'Jackets';
    casual?: 'Lehengas' | 'Kurtas' | 'sherwani' | 'Jackets';
  };
}

/**
 * An interface that describes the properties
 * that are required to create a new Product model
 */
interface productAttrs {
  title: string;
  description: string;
  size: size[];
  price: number;
  color: string;
  quantity: number;

  outfit: outfit;
  keywords: string[];
  gender: 'male' | 'female';
  images: string[];
  discount?: number;
  inOffer?: boolean;
  isNewProduct: boolean;
  designerCollection: boolean;
  trending: boolean;
}

interface offer {
  discount: number;
  inOffer: boolean;
}
interface CategoryOffer {
  category: {
    main: string;
    sub: string;
  };
  discount: number;
  inOffer: boolean;
}

/**
 * An interface that describes the properties
 * that a Product Model has
 */
interface ProductModel extends Model<ProductDoc> {
  build(attrs: productAttrs): ProductDoc;
  findByEvent(event: {
    id: Types.ObjectId;
    version: number;
  }): Promise<ProductDoc | null>;
}

/**
 * An interface that describes the properties
 * hat a Product Document has
 */
interface ProductDoc extends Document {
  id: Types.ObjectId;
  title: string;
  description: string;
  size: size[];
  price: number;
  color: string;
  quantity: number;
  version: number;
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

export {
  CategoryOffer,
  ProductDoc,
  ProductModel,
  femaleType,
  kidsType,
  maleType,
  offer,
  outfit,
  productAttrs,
};
