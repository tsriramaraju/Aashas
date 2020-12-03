import { Listener, OrderPaymentUpdatedEvent, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';

import { Order } from '../../models/Orders';
import { queueGroupName } from '../queueGroupName';

export class OrderPaymentUpdatedListener extends Listener<OrderPaymentUpdatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OrderPaymentUpdated;

  async onMessage(data: OrderPaymentUpdatedEvent['data'], msg: Message) {
    try {
      const { orderID, payment } = data;

      const order = await Order.findByEvent({
        id: orderID,
        version: data.version,
      });

      if (!order) throw new Error('order not found');
      order.payment = payment;
      await order.save();

      process.env.NODE_ENV !== 'test' &&
        console.log('Order Payment Status updated');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
