import {
  DatabaseConnectionError,
  salesBannerAttrs,
  SalesBannerDoc,
  SalesBannerModel,
} from '@aashas/common';
import { model, Schema } from 'mongoose';

const salesBannerSchema = new Schema(
  {
    title: { required: true, type: String },
    img: { required: true, type: String },
    type: { required: true, type: String, enum: ['percentage', 'price'] },
    discount: { required: true, type: Number },
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

salesBannerSchema.statics.build = (attrs: salesBannerAttrs) => {
  return new SalesBanner(attrs);
};

const SalesBanner = model<SalesBannerDoc, SalesBannerModel>(
  'account',
  salesBannerSchema
);

SalesBanner.on('index', function (err) {
  if (err) {
    throw new DatabaseConnectionError(err.message);
  }
});

export { SalesBanner };
