import {
  Listener,
  natsWrapper,
  paymentStatusUpdate,
  PaymentFailedEvent,
  Subjects,
} from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/Orders';
import { updateOrder } from '../../services/updateOrder';
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
      const res = await updateOrder(order.id, payment);

      if (!res) throw new Error('Error in updating order in from listener');
      process.env.NODE_ENV !== 'test' && console.log('payment status updated');

      new OrderPaymentUpdatedPublisher(natsWrapper.client).publish({
        version: res.version,
        mode: ['email'],
        orderID: res.id,
        payment: res.payment,
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
