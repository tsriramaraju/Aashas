import { natsWrapper } from '@aashas/common';
import { CustomProductCreatedListener } from './customProductCreated';
import { CustomProductDeletedListener } from './customProductDeleted';
import { CustomProductUpdatedListener } from './customProductUpdated';
import { OfferCreatedListener } from './offerCreated';
import { OfferDeletedListener } from './offerDeleted';
import { OfferUpdatedListener } from './offerUpdated';
import { OrderCreatedListener } from './orderCreated';
import { OrderDeletedListener } from './asdasdasd';
import { OrderPaymentUpdatedListener } from './orderPaymentUpdates';
import { OrderStatusUpdatedListener } from './orderStatusUpdated';
import { ProductCreatedListener } from './productCreated';
import { ProductDeletedListener } from './productDeleted';
import { ProductUpdatedListener } from './productUpdated';

export const initializeListeners = () => {
  new CustomProductCreatedListener(natsWrapper.client).listen();
  new CustomProductDeletedListener(natsWrapper.client).listen();
  new CustomProductUpdatedListener(natsWrapper.client).listen();

  new ProductCreatedListener(natsWrapper.client).listen();
  new ProductDeletedListener(natsWrapper.client).listen();
  new ProductUpdatedListener(natsWrapper.client).listen();

  new OfferCreatedListener(natsWrapper.client).listen();
  new OfferDeletedListener(natsWrapper.client).listen();
  new OfferUpdatedListener(natsWrapper.client).listen();

  new OrderCreatedListener(natsWrapper.client).listen();
  new OrderDeletedListener(natsWrapper.client).listen();
  new OrderPaymentUpdatedListener(natsWrapper.client).listen();
  new OrderStatusUpdatedListener(natsWrapper.client).listen();
};
