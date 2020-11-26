import {
  Listener,
  OfferDeletedEvent,
  ResourceNotFoundError,
  Subjects,
} from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/Products';
import { queueGroupName } from '../queueGroupName';

export class OfferDeletedListener extends Listener<OfferDeletedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OfferDeleted;

  async onMessage(data: OfferDeletedEvent['data'], msg: Message) {
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
      console.log('Offer Deleted');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
