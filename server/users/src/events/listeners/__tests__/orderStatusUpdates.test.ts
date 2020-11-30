import { natsWrapper, paymentModes, paymentStatus } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/Orders';
import { User } from '../../../models/Users';
import { OrderStatusUpdatedListener } from '../orderStatusUpdated';

describe('Orders status Updated listener test group', () => {
  it('should update existing Orders on receiving Orders status updated event', async () => {
    await global.userLogin();
    await global.userLogin();
    const user = await User.find().lean();
    const order = await global.createOrder(user![0]._id);
    const order2 = await global.createOrder(user![1]._id);
    const orderPreFetch = await Order.find();

    expect(orderPreFetch![0].status).toBe('working on it');
    expect(orderPreFetch![1].status).toBe('working on it');

    expect(orderPreFetch!.length).toBe(2);

    const listener = new OrderStatusUpdatedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage(
      {
        orderID: order._id,
        version: 1,
        orderStatus: 'shipped',
        mode: ['email'],
        data: {
          body: '',
          message: '',
          title: '',
        },
      },
      msg
    );

    const ordersPostFetch1 = await Order.findById(order.id);
    const ordersPostFetch2 = await Order.findById(order2.id);
    expect(ordersPostFetch1!.status).toBe('shipped');
    expect(ordersPostFetch2!.status).toBe('working on it');
  });
});
