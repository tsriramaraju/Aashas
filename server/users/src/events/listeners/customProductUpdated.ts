import { CustomProductUpdatedEvent, Listener, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { CustomProduct } from '../../models/CustomProducts';

import { queueGroupName } from '../queueGroupName';

export class CustomProductUpdatedListener extends Listener<CustomProductUpdatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.CustomProductUpdated;

  async onMessage(data: CustomProductUpdatedEvent['data'], msg: Message) {
    try {
      const { product } = data;

      const existingProd = await CustomProduct.findById(product.id);
      existingProd != product;
      await existingProd!.save();
      console.log('Custom product Updated');
      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
