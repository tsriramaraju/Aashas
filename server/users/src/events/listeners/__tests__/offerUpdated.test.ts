import { natsWrapper } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../../models/Products';

import { OfferUpdatedListener } from '../offerUpdated';

describe('Offer Updated listener test group', () => {
  it('should update existing product on receiving offer Updated event', async () => {
    const product = await global.createProduct();
    product.inOffer = true;
    product.discount = 50;

    await product.save();

    const prodPreFetch = await Product.find();
    expect(prodPreFetch![0].inOffer).toBe(true);
    expect(prodPreFetch![0].discount).toBe(50);
    prodPreFetch[0].inOffer = true;
    prodPreFetch[0].discount = 70;
    await prodPreFetch[0].save();

    expect(prodPreFetch![0].version).toBe(2);
    expect(prodPreFetch!.length).toBe(1);
    const listener = new OfferUpdatedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage(
      {
        product: prodPreFetch[0],
        mode: ['email'],
        version: 3,
        data: {
          body: '',
          message: '',
          title: '',
        },
      },
      msg
    );

    const prodPostFetch1 = await Product.find();
    expect(prodPostFetch1!.length).toBe(1);
    expect(prodPostFetch1![0].inOffer).toBe(true);
    expect(prodPostFetch1![0].discount).toBe(70);
    expect(prodPostFetch1![0].version).toBe(3);
  });
});
