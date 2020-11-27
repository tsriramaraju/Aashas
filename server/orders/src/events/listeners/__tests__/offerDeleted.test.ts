import { natsWrapper } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../../models/Products';
import { OfferDeletedListener } from '../offerDeleted';

describe('Offer Deleted listener test group', () => {
  it('should update existing product on receiving offer Deleted event', async () => {
    const product = await global.createProduct();
    product.inOffer = true;
    product.discount = 50;

    await product.save();

    const prodPreFetch = await Product.find();
    expect(prodPreFetch![0].inOffer).toBe(true);
    expect(prodPreFetch![0].discount).toBe(50);
    prodPreFetch[0].inOffer = false;
    prodPreFetch[0].discount = 0;
    await prodPreFetch[0].save();

    expect(prodPreFetch!.length).toBe(1);

    const listener = new OfferDeletedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage(
      {
        product: prodPreFetch[0],
        version: 1,
      },
      msg
    );

    const prodPostFetch1 = await Product.find();
    expect(prodPostFetch1!.length).toBe(1);
    expect(prodPostFetch1![0].inOffer).toBe(false);
    expect(prodPostFetch1![0].discount).toBe(0);
  });
});
