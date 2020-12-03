import {
  Listener,
  natsWrapper,
  OrderCreatedEvent,
  Subjects,
} from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/Orders';
import { Product } from '../../models/Products';
import { ProductUpdatedPublisher } from '../publishers/productUpdated';
import { queueGroupName } from '../queueGroupName';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OrderCreated;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    try {
      const products = data.order.items;

      const promises = products.map(async (product) => {
        const prod = await Product.findByEvent({
          id: product.prodId,
          version: data.version,
        });

        if (!prod) throw new Error('product not found');

        --prod.quantity;
        await prod.save();

        new ProductUpdatedPublisher(natsWrapper.client).publish({
          product: prod,
          version: prod.version,
        });
      });
      await Promise.all(promises);
      msg.ack();
    } catch (error) {
      console.log(error.message);
    }
  }
}
