import {
  CustomProductDeletedEvent,
  Listener,
  ResourceNotFoundError,
  Subjects,
} from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { CustomProduct } from '../../models/CustomProducts';
import { queueGroupName } from '../queueGroupName';

export class CustomProductDeletedListener extends Listener<CustomProductDeletedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.CustomProductDeleted;

  async onMessage(data: CustomProductDeletedEvent['data'], msg: Message) {
    try {
      const { productID, version } = data;

      const product = await CustomProduct.findByEvent({
        id: productID,
        version: version,
      });

      if (!product) {
        throw new ResourceNotFoundError('Custom product not found');
      }

      await product.remove();
      console.log('product Deleted');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
