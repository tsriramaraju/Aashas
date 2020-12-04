import { notificationAttrs, ServerError } from '@aashas/common';
import { Notification } from '../models/Notification';

export const mobileNotification = async (data: {
  mobile: number;
  message: string;
  group?: string;
}) => {
  try {
    const notificationData: notificationAttrs = {
      group: data.group || `individual email to ${data.mobile}`,
      message: data.message,
    };
    await Notification.build(notificationData).save();
    //  TODO : mobile server
    console.log(data);
  } catch (error) {
    throw new ServerError(error);
  }
};
