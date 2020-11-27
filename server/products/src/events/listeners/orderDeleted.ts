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

      products.forEach(async (product) => {
        const prod = await Product.findById(product.prodId);

        if (!prod) throw new Error('product not found');
        prod.quantity++;
        await prod.save();

        new ProductUpdatedPublisher(natsWrapper.client).publish({
          product: prod,
          version: prod.version + 1,
        });
      });
      msg.ack();
      //  FIXME : needs something to wait
      await Product.find().lean();
    } catch (error) {
      console.log(error.message);
    }
  }
}
