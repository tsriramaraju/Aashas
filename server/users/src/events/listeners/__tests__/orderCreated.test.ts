import { natsWrapper } from '@aashas/common';
import { Message } from 'node-nats-streaming';
import { CustomProduct } from '../../../models/CustomProducts';
import { CustomProductCreatedListener } from '../customProductCreated';

describe('Order created listener test group', () => {
  it('should create Order on receiving Order created event', async () => {
    const product = await global.createCustomProduct();

    const prodPreFetch = await CustomProduct.find();
    expect(prodPreFetch!.length).toBe(1);

    await prodPreFetch[0].deleteOne();
    const prodPostFetch = await CustomProduct.find();
    expect(prodPostFetch!.length).toBe(0);

    const listener = new CustomProductCreatedListener(natsWrapper.client);
    const msg = { ack: () => {} } as Message;

    await listener.onMessage(
      {
        product,
        mode: 'email',

        data: {
          body: '',
          message: '',
        },
      },
      msg
    );

    const prodPostFetch1 = await CustomProduct.find();
    expect(prodPostFetch1!.length).toBe(1);
  });
});
