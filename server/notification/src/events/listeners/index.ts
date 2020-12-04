import { natsWrapper } from '@aashas/common';
import { CustomProductCreatedListener } from './customProductCreated';
import { CustomProductDeletedListener } from './customProductDeleted';
import { CustomProductUpdatedListener } from './customProductUpdated';
import { GenerateOTPListener } from './generateOTP';
import { OrderCreatedListener } from './orderCreated';
import { OrderDeletedListener } from './orderDeleted';
import { OrderPaymentUpdatedListener } from './orderPaymentUpdated';
import { OrderStatusUpdatedListener } from './orderStatusUpdated';
import { UserCreatedListener } from './userCreated';
import { UserDeletedListener } from './userDeleted';
import { UserUpdatedListener } from './userUpdated';

export const initializeListeners = () => {
  new CustomProductCreatedListener(natsWrapper.client).listen();
  new CustomProductUpdatedListener(natsWrapper.client).listen();
  new CustomProductDeletedListener(natsWrapper.client).listen();

  new UserCreatedListener(natsWrapper.client).listen();
  new UserUpdatedListener(natsWrapper.client).listen();
  new UserDeletedListener(natsWrapper.client).listen();

  new OrderCreatedListener(natsWrapper.client).listen();
  new OrderStatusUpdatedListener(natsWrapper.client).listen();
  new OrderPaymentUpdatedListener(natsWrapper.client).listen();
  new OrderDeletedListener(natsWrapper.client).listen();

  new GenerateOTPListener(natsWrapper.client).listen();
};
