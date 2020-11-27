import { Router, Request, Response } from 'express';
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

  //  TODO : events

  res.status(201).json({ msg: 'Order created successfully' });
});

export { router as createOrderRouter };
