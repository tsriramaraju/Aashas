import { natsWrapper } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../../models/Products';
import { ProductUpdatedListener } from '../productUpdated';

describe('Product Updated listener test group', () => {
  it('should update existing product on receiving product updated event', async () => {
    await global.createProduct();

    const prodPreFetch = await Product.find();
    expect(prodPreFetch![0].title).not.toBe('new product test');
    (prodPreFetch[0].title = 'new product test'), await prodPreFetch[0].save();

    expect(prodPreFetch!.length).toBe(1);

    const listener = new ProductUpdatedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage({ product: prodPreFetch[0], version: 1 }, msg);

    const prodPostFetch1 = await Product.find();
    expect(prodPostFetch1!.length).toBe(1);
    expect(prodPostFetch1![0].title).toBe('new product test');
  });
});
