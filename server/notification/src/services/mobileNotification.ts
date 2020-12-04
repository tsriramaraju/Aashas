import { ServerError } from '@aashas/common';

export const mobileNotification = (data: {
  mobile: number;
  message: string;
}) => {
  try {
    //  TODO : mobile server
    console.log(data);
  } catch (error) {
    throw new ServerError(error);
  }
};
