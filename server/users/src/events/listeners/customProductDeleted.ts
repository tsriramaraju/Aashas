import { CustomProductDeletedEvent, Listener, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { CustomProduct } from '../../models/CustomProducts';
import { queueGroupName } from '../queueGroupName';

export class CustomProductDeletedListener extends Listener<CustomProductDeletedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.CustomProductDeleted;

  async onMessage(data: CustomProductDeletedEvent['data'], msg: Message) {
    try {
      const { productID } = data;

      await CustomProduct.findByIdAndDelete(productID);
      console.log('product Deleted');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
