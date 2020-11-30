import {
  Listener,
  natsWrapper,
  paymentStatusUpdate,
  PaymentFailedEvent,
  Subjects,
} from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/Orders';
import { OrderPaymentUpdatedPublisher } from '../publishers/orderPaymentUpdated';
import { queueGroupName } from '../queueGroupName';

export class PaymentFailedListener extends Listener<PaymentFailedEvent> {
  readonly subject = Subjects.PaymentFailed;

  queueGroupName = queueGroupName;

  async onMessage(data: PaymentFailedEvent['data'], msg: Message) {
    try {
      const order = await Order.findByEvent({
        id: data.orderId,
        version: data.version,
      });

      if (!order) throw new Error('Order not found');

      const payment: paymentStatusUpdate = {
        payment: {
          status: data.paymentStatus,
          method: data.paymentMode,
        },
      };
      await order.updateOne(payment);
      console.log('payment status updated');

      new OrderPaymentUpdatedPublisher(natsWrapper.client).publish({
        version: order.version + 1,
        mode: ['email'],
        orderID: order.id,
        payment: order.payment,
        data: {
          title: 'Payment Failed',
          message: 'This is message',
        },
      });

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
