import { Types, Model, Document } from 'mongoose';

/**
 * An interface that describes the properties
 * that are required to create a new Sales banner
 */
interface salesBannerAttrs {
  title: string;
  img: string;
  type: 'percentage' | 'price';
  discount: number;
}

/**
 * An interface that describes the properties
 * that a Sales banner  Model has
 */
interface SalesBannerModel extends Model<SalesBannerDoc> {
  build(attrs: salesBannerAttrs): SalesBannerDoc;
}

/**
 * An interface that describes the properties
 * hat a Sales banner Document has
 */
interface SalesBannerDoc extends Document {
  // id: Types.ObjectId;
  title: string;
  img: string;
  type: 'percentage' | 'price';
  discount: number;
}

export { salesBannerAttrs, SalesBannerDoc, SalesBannerModel };
