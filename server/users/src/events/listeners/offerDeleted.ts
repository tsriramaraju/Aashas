import { Listener, OfferDeletedEvent, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/Products';
import { queueGroupName } from '../queueGroupName';

export class OfferDeletedListener extends Listener<OfferDeletedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.OfferDeleted;

  async onMessage(data: OfferDeletedEvent['data'], msg: Message) {
    try {
      const { product } = data;

      const existingProd = await Product.findById(product.id);
      existingProd != product;
      await existingProd!.save();
      console.log('Offer Deleted');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
