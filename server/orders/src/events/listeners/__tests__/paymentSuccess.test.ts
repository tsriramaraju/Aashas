import { natsWrapper, paymentModes, paymentStatus } from '@aashas/common';
import { Types } from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/Orders';
import { PaymentSuccessListener } from '../paymentSuccess';

describe('Payment Success listener test group', () => {
  it('should update payment mode and publish event on receiving payment success event', async () => {
    const order = await global.createOrder(Types.ObjectId().toHexString());

    expect(order.payment.status).toBe(paymentStatus.pending);

    const listener = new PaymentSuccessListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage(
      {
        orderId: order.id,
        paymentMode: paymentModes.creditCard,
        paymentStatus: paymentStatus.paid,
        version: 1,
      },
      msg
    );

    const orders = await Order.findOne();

    expect(natsWrapper.client.publish).toBeCalledTimes(1);
    expect(orders!.version).toBe(1);
    expect(orders!.payment.status).toBe(paymentStatus.paid);
    expect(orders!.payment.method).toBe(paymentModes.creditCard);
  });
});
