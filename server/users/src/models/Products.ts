import {
  femaleType,
  kidsType,
  maleType,
  productAttrs,
  ProductDoc,
  ProductModel,
  size,
} from '@aashas/common';
import { model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    size: [
      {
        type: String,
        required: true,
        enum: [size.L, size.M, size.S, size.XL, size.XS, size.XXL],
      },
    ],
    price: { type: Number, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true },

    outfit: {
      type: { type: String, required: true },
      occasion: { type: Object, required: true },
    },
    keywords: [{ type: String, required: true }],
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    images: [{ type: String, required: true }],
    discount: { type: Number, required: true },
    inOffer: Boolean,
    isNewProduct: Boolean,
    designerCollection: Boolean,
    trending: Boolean,
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

productSchema.statics.maleBuild = (attrs: productAttrs<maleType>) => {
  return new Product(attrs);
};
productSchema.statics.femaleBuild = (attrs: productAttrs<femaleType>) => {
  return new Product(attrs);
};
productSchema.statics.kidsBuild = (attrs: productAttrs<kidsType>) => {
  return new Product(attrs);
};

const Product = model<
  ProductDoc<maleType | femaleType | kidsType>,
  ProductModel<maleType | femaleType | kidsType>
>('product', productSchema);

export { Product };
