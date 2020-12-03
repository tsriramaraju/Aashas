import {
  Listener,
  ProductDeletedEvent,
  ResourceNotFoundError,
  Subjects,
} from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/Products';
import { queueGroupName } from '../queueGroupName';

export class ProductDeletedListener extends Listener<ProductDeletedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.ProductDeleted;

  async onMessage(data: ProductDeletedEvent['data'], msg: Message) {
    try {
      const { productID, version } = data;

      const existingProd = await Product.findByEvent({
        id: productID,
        version,
      });

      if (!existingProd) {
        throw new ResourceNotFoundError('Product not found');
      }

      await existingProd.remove();

      process.env.NODE_ENV !== 'test' && console.log('product Deleted');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
