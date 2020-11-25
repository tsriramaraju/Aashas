import {
  Listener,
  ProductUpdatedEvent,
  ResourceNotFoundError,
  Subjects,
} from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/Products';
import { queueGroupName } from '../queueGroupName';

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.ProductUpdated;

  async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
    try {
      const { product, version } = data;
      const existingProd = await Product.findByEvent({
        id: product.id,
        version,
      });

      if (!existingProd) {
        throw new ResourceNotFoundError('Product not found');
      }

      existingProd.updateOne(product);
      await existingProd.save();
      console.log('product Updated');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
