import { Listener, OfferUpdatedEvent, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/Products';
import { queueGroupName } from '../queueGroupName';

export class OfferUpdatedListener extends Listener<OfferUpdatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OfferUpdated;

  async onMessage(data: OfferUpdatedEvent['data'], msg: Message) {
    try {
      const { product } = data;

      const existingProd = await Product.findById(product.id);
      existingProd != product;
      await existingProd!.save();
      console.log('Offer Updated');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
