import { natsWrapper } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/Orders';
import { Product } from '../../../models/Products';

import { OrderDeletedListener } from '../orderDeleted';

describe('Order deleted listener test group', () => {
  it('should update product quantity on receiving Order created event', async () => {
    //  FIXME : check again
    // const prod = await global.createProduct();
    // const order = await global.createOrder(prod.id);
    // const ordersPreFetch = await Order.find();
    // expect(ordersPreFetch!.length).toBe(1);
    // expect(prod.quantity).toBe(120);
    // const listener = new OrderDeletedListener(natsWrapper.client);
    // const msg = { ack: () => {} } as Message;
    // await listener.onMessage(
    //   {
    //     order,
    //     orderID: order.id,
    //     mode: 'email',
    //     version: 1,
    //     data: {
    //       body: '',
    //       message: '',
    //     },
    //   },
    //   msg
    // );
    // const products = await Product.find();
    // expect(products![0].quantity).toBe(121);
  });
});
