import {
  CustomProductDoc,
  CustomProductModel,
  customProductsAttrs,
  femaleType,
  kidsType,
  maleType,
  size,
} from '@aashas/common';
import { model, Schema } from 'mongoose';

const customProductSchema = new Schema(
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
    refImages: [{ type: String, required: true }],
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

customProductSchema.statics.maleBuild = (
  attrs: customProductsAttrs<maleType>
) => {
  return new CustomProduct(attrs);
};
customProductSchema.statics.femaleBuild = (
  attrs: customProductsAttrs<femaleType>
) => {
  return new CustomProduct(attrs);
};
customProductSchema.statics.kidsBuild = (
  attrs: customProductsAttrs<kidsType>
) => {
  return new CustomProduct(attrs);
};

const CustomProduct = model<
  CustomProductDoc<maleType | femaleType | kidsType>,
  CustomProductModel<maleType | femaleType | kidsType>
>('custom product', customProductSchema);

export { CustomProduct };
