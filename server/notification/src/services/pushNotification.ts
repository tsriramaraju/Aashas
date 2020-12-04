import { ServerError } from '@aashas/common';

export const pushNotification = (data: { id: string; message: string }) => {
  try {
    //  TODO : notification server
    console.log(data);
  } catch (error) {
    throw new ServerError(error);
  }
};
