import { CustomProductCreatedEvent, Listener, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { CustomProduct } from '../../models/CustomProducts';
import { queueGroupName } from '../queueGroupName';

export class CustomProductCreatedListener extends Listener<CustomProductCreatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.CustomProductCreated;

  async onMessage(data: CustomProductCreatedEvent['data'], msg: Message) {
    try {
      const { product } = data;

      await CustomProduct.build({
        color: product.color,
        description: product.description,
        title: product.title,
        gender: product.gender,
        images: product.images,
        userId: product.userId,
        outfit: product.outfit,
        price: product.price,
        size: product.size,
        refImages: product.refImages,
      }).save();
      process.env.NODE_ENV !== 'test' && console.log('Custom product created');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
