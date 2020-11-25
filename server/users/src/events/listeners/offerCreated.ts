import {
  Listener,
  OfferCreatedEvent,
  ResourceNotFoundError,
  Subjects,
} from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/Products';
import { queueGroupName } from '../queueGroupName';

export class OfferCreatedListener extends Listener<OfferCreatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OfferCreated;

  async onMessage(data: OfferCreatedEvent['data'], msg: Message) {
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
      console.log('Offer Created');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
