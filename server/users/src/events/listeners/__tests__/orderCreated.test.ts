import { natsWrapper } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/Orders';
import { User } from '../../../models/Users';
import { OrderCreatedListener } from '../orderCreated';

describe('Order created listener test group', () => {
  it('should create Order on receiving Order created event', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();
    const order = await global.createOrder(user!._id);
    const ordersPreFetch = await Order.find();
    expect(ordersPreFetch!.length).toBe(1);

    await ordersPreFetch[0].deleteOne();
    const ordersPostFetch = await Order.find();
    expect(ordersPostFetch!.length).toBe(0);

    const listener = new OrderCreatedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage(
      {
        order,
        mode: ['email'],
        version: 1,
        data: {
          body: '',
          message: '',
          title: '',
        },
      },
      msg
    );
    const ordersPostFetch1 = await Order.find();
    expect(ordersPostFetch1!.length).toBe(1);
  });
});
