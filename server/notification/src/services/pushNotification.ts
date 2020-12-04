import { notificationAttrs, ServerError } from '@aashas/common';
import { Notification } from '../models/Notification';

export const pushNotification = async (data: {
  id: string;
  message: string;
  group?: string;
}) => {
  try {
    const notificationData: notificationAttrs = {
      group: data.group || `individual email to ${data.id}`,
      message: data.message,
    };
    await Notification.build(notificationData).save();
    //  TODO : notification server
    console.log(data);
  } catch (error) {
    throw new ServerError(error);
  }
};
