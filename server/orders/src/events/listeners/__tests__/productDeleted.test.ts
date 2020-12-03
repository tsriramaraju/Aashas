import { natsWrapper } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../../models/Products';

import { ProductDeletedListener } from '../productDeleted';

describe('Product Deleted listener test group', () => {
  it('should delete existing product on receiving product deleted event', async () => {
    const product = await global.createProduct();

    const prodPreFetch = await Product.find();
    expect(prodPreFetch!.length).toBe(1);
    // console.log(prodPreFetch);

    const listener = new ProductDeletedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage({ productID: product.id, version: 1 }, msg);

    const prodPostFetch = await Product.find();
    expect(prodPostFetch!.length).toBe(0);
  });
});
