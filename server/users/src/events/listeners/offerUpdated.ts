import {
  Listener,
  OfferUpdatedEvent,
  ResourceNotFoundError,
  Subjects,
} from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/Products';
import { queueGroupName } from '../queueGroupName';

export class OfferUpdatedListener extends Listener<OfferUpdatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OfferUpdated;

  async onMessage(data: OfferUpdatedEvent['data'], msg: Message) {
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
      console.log('Offer Updated');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
