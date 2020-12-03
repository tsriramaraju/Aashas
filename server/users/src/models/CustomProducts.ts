import {
  CustomProductDoc,
  CustomProductModel,
  customProductsAttrs,
  size,
} from '@aashas/common';
import { model, Schema, Types } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

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
    discount: { type: Number },
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

customProductSchema.set('versionKey', 'version');
customProductSchema.plugin(updateIfCurrentPlugin);

customProductSchema.statics.findByEvent = (event: {
  id: Types.ObjectId;
  version: number;
}) => {
  return CustomProduct.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

customProductSchema.statics.build = (attrs: customProductsAttrs) => {
  return new CustomProduct(attrs);
};
const CustomProduct = model<CustomProductDoc, CustomProductModel>(
  'custom product',
  customProductSchema
);

export { CustomProduct };
