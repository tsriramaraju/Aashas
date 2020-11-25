import { Listener, OrderStatusUpdatedEvent, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';

import { Order } from '../../models/Orders';
import { queueGroupName } from '../queueGroupName';

export class OrderStatusUpdatedListener extends Listener<OrderStatusUpdatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OrderStatusUpdated;

  async onMessage(data: OrderStatusUpdatedEvent['data'], msg: Message) {
    try {
      const { orderID, orderStatus } = data;

      await Order.findByIdAndUpdate(orderID, {
        status: orderStatus,
      });
      console.log('Order Status updated');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
