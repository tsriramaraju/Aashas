import { ServerError } from '@aashas/common';
import axios from 'axios';
import { keys } from '../config/keys';

export const slackNotification = async (data: {
  mobile: number;
  message: string;
}) => {
  try {
    const slackData = {
      text: data.message,
    };

    const res = await axios.post(keys.slack!, slackData, {
      headers: { 'Content-type': 'application/json' },
    });
    console.log(res.data);
  } catch (error) {
    throw new ServerError(error);
  }
};
