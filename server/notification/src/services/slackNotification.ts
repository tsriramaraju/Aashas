import { ServerError } from '@aashas/common';

export const slackNotification = (data: {
  mobile: number;
  message: string;
}) => {
  try {
    //  TODO : slack server
    console.log(data);
    //  TODO : add later
  } catch (error) {
    throw new ServerError(error);
  }
};
