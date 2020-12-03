import { natsWrapper } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../../models/Products';
import { OfferCreatedListener } from '../offerCreated';

describe('Offer created listener test group', () => {
  it('should update existing product on receiving offer created event', async () => {
    await global.createProduct();

    const prodPreFetch = await Product.find();
    expect(prodPreFetch![0].inOffer).toBe(undefined);
    expect(prodPreFetch![0].discount).toBe(undefined);
    prodPreFetch[0].inOffer = true;
    prodPreFetch[0].discount = 50;
    await prodPreFetch[0].save();
    expect(prodPreFetch![0].version).toBe(1);

    expect(prodPreFetch!.length).toBe(1);

    const listener = new OfferCreatedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage(
      {
        version: 2,
        product: prodPreFetch[0],
        mode: ['email'],
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
    expect(prodPostFetch1![0].discount).toBe(50);
    expect(prodPostFetch1![0].version).toBe(2);
  });
});
