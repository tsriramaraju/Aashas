import {
  CustomProductDoc,
  CustomProductModel,
  customProductRequestAttrs,
  customProductsAttrs,
  size,
} from '@aashas/common';
import { model, Schema, Types } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

const customProductSchema = new Schema(
  {
    title: String,
    description: String,
    size: [
      {
        type: String,

        enum: [size.L, size.M, size.S, size.XL, size.XS, size.XXL],
      },
    ],
    price: { type: Number },
    color: String,

    outfit: {
      type: { type: String },
      occasion: { type: Object },
    },
    keywords: [{ type: String }],
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    images: [{ type: String }],
    refImages: [{ type: String }],
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
customProductSchema.statics.request = (attrs: customProductRequestAttrs) => {
  return new CustomProduct(attrs);
};
const CustomProduct = model<CustomProductDoc, CustomProductModel>(
  'custom product',
  customProductSchema
);

export { CustomProduct };
