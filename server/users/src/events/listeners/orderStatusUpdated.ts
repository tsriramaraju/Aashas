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

      const order = await Order.findByEvent({
        id: orderID,
        version: data.version,
      });

      if (!order) throw new Error('order not found');
      order.status = orderStatus;
      await order.save();
      process.env.NODE_ENV !== 'test' && console.log('Order Status updated');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
