import { natsWrapper } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { CustomProduct } from '../../../models/CustomProducts';
import { CustomProductUpdatedListener } from '../customProductUpdated';

describe('Custom Product Updated listener test group', () => {
  it('should update existing Custom product on receiving Custom product updated event', async () => {
    await global.createCustomProduct();

    const prodPreFetch = await CustomProduct.find();
    expect(prodPreFetch![0].title).not.toBe('new product test');
    console.log(prodPreFetch[0]);
    prodPreFetch[0].title = 'new product test';

    expect(prodPreFetch!.length).toBe(1);

    const listener = new CustomProductUpdatedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage(
      {
        product: prodPreFetch[0],

        mode: 'email',
        version: 1,
        data: {
          body: '',
          message: '',
        },
      },
      msg
    );

    const prodPostFetch1 = await CustomProduct.find();
    console.log(prodPostFetch1);
    expect(prodPostFetch1!.length).toBe(1);
    expect(prodPostFetch1![0].title).toBe('new product test');
  });
});
