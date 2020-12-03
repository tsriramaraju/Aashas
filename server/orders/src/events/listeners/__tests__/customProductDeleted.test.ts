import { natsWrapper } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { CustomProduct } from '../../../models/CustomProducts';
import { CustomProductDeletedListener } from '../customProductDeleted';

describe('Custom Product Deleted listener test group', () => {
  it('should delete existing Custom product on receiving Custom product deleted event', async () => {
    const product = await global.createCustomProduct();

    const prodPreFetch = await CustomProduct.find();
    expect(prodPreFetch!.length).toBe(1);

    const listener = new CustomProductDeletedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage(
      {
        productID: product.id,
        version: 1,
        mode: ['email'],
        data: {
          title: '',
          message: '',
        },
      },
      msg
    );
    const prodPostFetch = await CustomProduct.find();
    expect(prodPostFetch!.length).toBe(0);
  });
});
