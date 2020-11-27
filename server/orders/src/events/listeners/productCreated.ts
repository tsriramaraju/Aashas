import { Listener, ProductCreatedEvent, Subjects } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/Products';
import { queueGroupName } from '../queueGroupName';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  queueGroupName = queueGroupName;
  readonly subject = Subjects.ProductCreated;

  async onMessage(data: ProductCreatedEvent['data'], msg: Message) {
    try {
      const { product } = data;

      await Product.build({
        color: product.color,
        description: product.description,
        designerCollection: product.designerCollection,
        gender: product.gender,
        images: product.images,
        isNewProduct: product.isNewProduct,
        keywords: product.keywords,
        outfit: product.outfit,
        price: product.price,
        quantity: product.quantity,
        size: product.size,
        title: product.title,
        trending: product.trending,
        discount: product.discount,
        inOffer: product.inOffer,
      }).save();
      console.log('product created');

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
