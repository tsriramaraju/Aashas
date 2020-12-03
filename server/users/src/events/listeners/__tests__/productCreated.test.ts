import { natsWrapper } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../../models/Products';
import { ProductCreatedListener } from '../productCreated';

describe('Product created listener test group', () => {
  it('should create product on receiving product created event', async () => {
    const product = await global.createProduct();

    const prodPreFetch = await Product.find();
    expect(prodPreFetch!.length).toBe(1);

    await prodPreFetch[0].deleteOne();
    const prodPostFetch = await Product.find();
    expect(prodPostFetch!.length).toBe(0);

    const listener = new ProductCreatedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage({ product, version: 1 }, msg);

    const prodPostFetch1 = await Product.find();
    expect(prodPostFetch1!.length).toBe(1);
    expect(prodPostFetch1![0].version).toBe(0);
  });
});
