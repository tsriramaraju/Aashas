import { natsWrapper } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { OrderCreatedPublisher } from '../../../events/publishers/orderCreated';
import { createOrder } from '../../../services/createOrder';

const router = Router();

/**
 *  @desc      Creates order
 *  @route     POST /api/v1/orders/
 *  @access    User
 *  @returns   status
 */
router.post('/', async (req: Request, res: Response) => {
  const order = req.body;

  const orderDoc = await createOrder(order);

  new OrderCreatedPublisher(natsWrapper.client).publish({
    version: orderDoc.version,
    mode: ['email'],
    order: orderDoc,
    data: {
      title: 'Order created',
      message: 'this is message',
    },
    //  FIXME : add email or contact
  });

  res.status(201).json({ msg: 'Order created successfully' });
});

export { router as createOrderRouter };
