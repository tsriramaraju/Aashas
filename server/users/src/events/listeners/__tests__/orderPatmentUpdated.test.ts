import { natsWrapper, paymentModes, paymentStatus } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { version } from 'process';
import { Order } from '../../../models/Orders';
import { User } from '../../../models/Users';
import { OrderPaymentUpdatedListener } from '../orderPaymentUpdates';

describe('Orders Payment status Updated listener test group', () => {
  it('should update existing Orders on receiving Orders Payment status updated event', async () => {
    await global.userLogin();
    await global.userLogin();
    const user = await User.find().lean();
    const order = await global.createOrder(user![0]._id);
    const order2 = await global.createOrder(user![1]._id);
    const orderPreFetch = await Order.find();

    expect(orderPreFetch![0].payment.status).toBe(paymentStatus.pending);
    expect(orderPreFetch![1].payment.status).toBe(paymentStatus.pending);
    expect(orderPreFetch![1].version).toBe(0);
    expect(orderPreFetch![0].version).toBe(0);

    expect(orderPreFetch!.length).toBe(2);

    const listener = new OrderPaymentUpdatedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage(
      {
        orderID: order._id,
        version: 1,
        payment: {
          status: paymentStatus.paid,
          method: paymentModes.creditCard,
        },
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
    expect(ordersPostFetch1!.payment.status).toBe(paymentStatus.paid);
    expect(ordersPostFetch2!.payment.status).toBe(paymentStatus.pending);
    expect(ordersPostFetch1!.version).toBe(1);
    expect(ordersPostFetch2!.version).toBe(0);
  });
});
