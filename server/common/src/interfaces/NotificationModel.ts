import { Model, Document, Types } from 'mongoose';

/**
 * An interface that describes the properties
 * that are required to create a new Notification Document
 */
interface notificationAttrs {
  group: string;
  message: string;
}

/**
 * An interface that describes the properties
 * that a Notification Model has
 */
interface NotificationModel extends Model<NotificationDoc> {
  build(attrs: notificationAttrs): NotificationDoc;
}

/**
 * An interface that describes the properties
 * hat a Notification Document has
 */
interface NotificationDoc extends Document {
  // id: Types.ObjectId;
  group: string;
  message: string;
}

export { NotificationDoc, NotificationModel, notificationAttrs };
