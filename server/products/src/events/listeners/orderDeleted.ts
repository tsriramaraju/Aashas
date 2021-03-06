import {
  Listener,
  natsWrapper,
  OrderDeletedEvent,
  Subjects,
} from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/Products';
import { ProductUpdatedPublisher } from '../publishers/productUpdated';
import { queueGroupName } from '../queueGroupName';

export class OrderDeletedListener extends Listener<OrderDeletedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OrderDeleted;

  async onMessage(data: OrderDeletedEvent['data'], msg: Message) {
    try {
      const products = data.order.items;

      const promises = products.map(async (product) => {
        const prod = await Product.findByEvent({
          id: product.prodId,
          version: data.version,
        });

        if (!prod) throw new Error('product not found');
        ++prod.quantity;
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
