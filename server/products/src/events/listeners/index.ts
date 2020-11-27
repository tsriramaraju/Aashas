import { natsWrapper } from '@aashas/common';
import { OrderCreatedListener } from './orderCreated';
import { OrderDeletedListener } from './orderDeleted';

export const initializeListeners = () => {
  new OrderCreatedListener(natsWrapper.client);
  new OrderDeletedListener(natsWrapper.client);
};
