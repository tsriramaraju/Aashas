import { natsWrapper, OrderDoc } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/Orders';
import { User } from '../../../models/Users';
import { OrderDeletedListener } from '../orderDeleted';

describe('Order Deleted listener test group', () => {
  it('should delete existing Order on receiving Order deleted event', async () => {
    await global.userLogin();
    const user = await User.findOne().lean();
    const order = await global.createOrder(user!._id);

    const orderPreFetch = await Order.find();
    expect(orderPreFetch!.length).toBe(1);

    const listener = new OrderDeletedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage(
      {
        orderID: order.id,
        order: {} as OrderDoc,
        mode: 'email',
        version: 1,
        data: {
          body: '',
          message: '',
        },
      },
      msg
    );
    const orderPostFetch = await Order.find();
    expect(orderPostFetch!.length).toBe(0);
  });
});
