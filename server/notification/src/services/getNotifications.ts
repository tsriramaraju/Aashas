import { DatabaseConnectionError } from '@aashas/common';
import { Notification } from '../models/Notification';

export const getNotification = async () => {
  try {
    return await Notification.find();
  } catch (error) {
    throw new DatabaseConnectionError(error.message);
  }
};
