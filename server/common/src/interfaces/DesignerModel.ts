import { Types, Model, Document } from 'mongoose';

/**
 * An interface that describes the properties
 * that are required to create a new Designer Account
 */
interface designerAttrs {
  name: string;
  email: string;
  id: Types.ObjectId;
  mobile: number;
  image: string;
  bio: string;
  blogs?: blog[];
}

interface designerInfoUpdate {
  name?: string;
  email?: string;
  mobile?: number;
  image?: string;
  bio?: string;
}

interface blog {
  title: string;
  image: string;
  content: string;
  slug: string;
}

/**
 * An interface that describes the properties
 * that a Designer Model has
 */
interface DesignerModel extends Model<DesignerDoc> {
  build(attrs: designerAttrs): DesignerDoc;
}

/**
 * An interface that describes the properties
 * hat a Designer Document has
 */
interface DesignerDoc extends Document {
  // id: Types.ObjectId;
  name: string;
  email: string;
  mobile: number;
  image: string;
  bio: string;
  blogs: {
    _id: Types.ObjectId;
    title: string;
    image: string;
    content: string;
    slug: string;
  }[];
}

export { designerAttrs, designerInfoUpdate, DesignerDoc, DesignerModel, blog };
