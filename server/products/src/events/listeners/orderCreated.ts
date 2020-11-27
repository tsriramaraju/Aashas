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

      products.forEach(async (product) => {
        const prod = await Product.findById(product.prodId);

        if (!prod) throw new Error('product not found');

        await prod.updateOne({ quantity: prod.quantity - 1 });

        new ProductUpdatedPublisher(natsWrapper.client).publish({
          product: prod,
          version: prod.version + 1,
        });
      });
      //  FIXME : needs something to wait
      await Product.find().lean();

      msg.ack();
    } catch (error) {
      console.log(error.message);
    }
  }
}
