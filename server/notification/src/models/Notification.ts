import {
  DatabaseConnectionError,
  notificationAttrs,
  NotificationDoc,
  NotificationModel,
} from '@aashas/common';
import { model, Schema } from 'mongoose';

const notificationSchema = new Schema(
  {
    group: { required: true, type: String },
    message: { required: true, type: String },
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

notificationSchema.statics.build = (attrs: notificationAttrs) => {
  return new Notification(attrs);
};

const Notification = model<NotificationDoc, NotificationModel>(
  'notification',
  notificationSchema
);

Notification.on('index', function (err) {
  if (err) {
    throw new DatabaseConnectionError(err.message);
  }
});

export { Notification };
