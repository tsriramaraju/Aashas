import { Listener, OfferCreatedEvent, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/Products';
import { queueGroupName } from '../queueGroupName';

export class OfferCreatedListener extends Listener<OfferCreatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OfferCreated;

  async onMessage(data: OfferCreatedEvent['data'], msg: Message) {
    try {
      const { product } = data;

      const existingProd = await Product.findById(product.id);
      existingProd != product;
      await existingProd!.save();
      console.log('Offer Created');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
