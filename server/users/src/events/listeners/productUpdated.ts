import { Listener, ProductUpdatedEvent, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/Products';
import { queueGroupName } from '../queueGroupName';

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.ProductUpdated;

  async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
    try {
      const { product } = data;

      const existingProd = await Product.findById(product.id);
      existingProd != product;
      await existingProd!.save();
      console.log('product Updated');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
