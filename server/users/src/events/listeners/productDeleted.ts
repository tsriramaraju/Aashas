import { Listener, ProductDeletedEvent, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/Products';
import { queueGroupName } from '../queueGroupName';

export class ProductDeletedListener extends Listener<ProductDeletedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.ProductDeleted;

  async onMessage(data: ProductDeletedEvent['data'], msg: Message) {
    try {
      const { productID } = data;

      await Product.findByIdAndDelete(productID);
      console.log('product Deleted');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
