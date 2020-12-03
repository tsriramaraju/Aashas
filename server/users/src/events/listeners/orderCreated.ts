import { Listener, OrderCreatedEvent, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';

import { Order } from '../../models/Orders';
import { queueGroupName } from '../queueGroupName';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OrderCreated;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    try {
      const { order } = data;

      await Order.build({
        address: order.address,
        items: order.items,
        orderDate: order.orderDate.toString(),
        payment: order.payment,
        price: order.price,
        status: order.status,
        userId: order.userId,
        deliveryDate: order.deliveryDate?.toString(),
        email: order.email,
        estDelivery: order.estDelivery?.toString(),
        mobile: order.mobile,
        note: order.note,
      }).save();
      process.env.NODE_ENV !== 'test' && console.log('Order created');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
