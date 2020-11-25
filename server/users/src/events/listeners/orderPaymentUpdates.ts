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

      await Order.findByIdAndUpdate(orderID, {
        payment,
      });
      console.log('Order Payment Status updated');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
