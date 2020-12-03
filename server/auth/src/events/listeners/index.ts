import { natsWrapper } from '@aashas/common';
import { UserDeletedListener } from './userDeleted';

export const initializeListener = () => {
  new UserDeletedListener(natsWrapper.client).listen();
};
