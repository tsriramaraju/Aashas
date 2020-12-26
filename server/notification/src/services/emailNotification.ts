import { notificationAttrs, ServerError } from '@aashas/common';
import { Notification } from '../models/Notification';
import axios from 'axios';
import { keys } from '../config/keys';

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

    const slackData = {
      text: data.body,
    };

    const res = await axios.post(keys.slack!, slackData, {
      headers: { 'Content-type': 'application/json' },
    });
    console.log(res.data);
  } catch (error) {
    throw new ServerError(error);
  }
};
