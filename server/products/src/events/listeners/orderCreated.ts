import { Listener, OrderCreatedEvent, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/Products';
import { queueGroupName } from '../queueGroupName';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OrderCreated;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    try {
      const products = data.order.items;

      products.forEach((product) => {
        // const prod= Product.findById(product.)
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
