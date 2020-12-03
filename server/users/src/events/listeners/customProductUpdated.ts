import {
  CustomProductUpdatedEvent,
  Listener,
  ResourceNotFoundError,
  Subjects,
} from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { CustomProduct } from '../../models/CustomProducts';

import { queueGroupName } from '../queueGroupName';

export class CustomProductUpdatedListener extends Listener<CustomProductUpdatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.CustomProductUpdated;

  async onMessage(data: CustomProductUpdatedEvent['data'], msg: Message) {
    try {
      const { product, version } = data;

      const customProduct = await CustomProduct.findByEvent({
        id: product.id,
        version: version,
      });

      if (!customProduct) {
        throw new ResourceNotFoundError('Custom product not found');
      }

      await customProduct.updateOne(product);

      await customProduct.save();
      process.env.NODE_ENV !== 'test' && console.log('Custom product Updated');
      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
