import { Model, Document, Types } from 'mongoose';

/**
 * An interface that describes the properties
 * that are required to create a new reset Document
 */
interface resetAttrs {
  uid: string;
  email: string;
}

/**
 * An interface that describes the properties
 * that a reset Model has
 */
interface ResetModel extends Model<ResetDoc> {
  build(attrs: resetAttrs): ResetDoc;
}

/**
 * An interface that describes the properties
 * hat a reset Document has
 */
interface ResetDoc extends Document {
  id: Types.ObjectId;
  uid: string;
  email: string;
}

export { ResetDoc, ResetModel, resetAttrs };
