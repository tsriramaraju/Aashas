import { natsWrapper } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/Orders';
import { Product } from '../../../models/Products';
import { OrderCreatedListener } from '../orderCreated';

describe('Order created listener test group', () => {
  it('should update product quantity on receiving Order created event', async () => {
    const prod = await global.createProduct();
    const order = await global.createOrder(prod.id);
    const ordersPreFetch = await Order.find();
    expect(ordersPreFetch!.length).toBe(1);
    expect(prod.quantity).toBe(120);
    const listener = new OrderCreatedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;
    await listener.onMessage(
      {
        order,
        mode: ['email'],
        version: 1,
        data: {
          title: '',
          message: '',
        },
      },
      msg
    );
    const products = await Product.find();
    expect(products![0].quantity).toBe(119);
    expect(products![0].version).toBe(1);
  });
});
