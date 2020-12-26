import { notificationAttrs, ServerError } from '@aashas/common';
import { Notification } from '../models/Notification';
import axios from 'axios';
import { keys } from '../config/keys';

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
    const slackData = {
      text: data.message,
      message: data.message,
    };

    const res = await axios.post(keys.slack!, slackData, {
      headers: { 'Content-type': 'application/json' },
    });
    console.log(res.data);
  } catch (error) {
    throw new ServerError(error);
  }
};
