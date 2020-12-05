import { productAttrs, ProductDoc, ProductModel, size } from '@aashas/common';
import { model, Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

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

productSchema.set('versionKey', 'version');
productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.build = (attrs: productAttrs) => {
  return new Product(attrs);
};

productSchema.statics.findByEvent = (event: {
  id: string;
  version: number;
}) => {
  return Product.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

const Product = model<ProductDoc, ProductModel>('product', productSchema);

export { Product };
