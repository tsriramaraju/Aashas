import { Listener, OrderDeletedEvent, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';

import { Order } from '../../models/Orders';
import { queueGroupName } from '../queueGroupName';

export class OrderDeletedListener extends Listener<OrderDeletedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OrderDeleted;

  async onMessage(data: OrderDeletedEvent['data'], msg: Message) {
    try {
      const { orderID } = data;

      await Order.findByIdAndDelete(orderID);
      console.log('Order Deleted');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
