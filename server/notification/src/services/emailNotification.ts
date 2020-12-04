import { notificationAttrs, ServerError } from '@aashas/common';
import { Notification } from '../models/Notification';

export const emailNotification = async (data: {
  email: string;
  subject: string;
  body: string;
  group?: string;
}) => {
  try {
    const notificationData: notificationAttrs = {
      group: data.group || `individual email to ${data.email}`,
      message: data.subject,
    };
    await Notification.build(notificationData).save();

    //  TODO : email server
    console.log(data);
  } catch (error) {
    throw new ServerError(error);
  }
};
