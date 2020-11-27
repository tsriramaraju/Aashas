import { Router, Request, Response } from 'express';
import { createOrder } from '../../../services/createOrder';
import { getOrders } from '../../../services/getOrders';

const router = Router();

/**
 *  @desc      get order
 *  @route     Get /api/v1/orders/
 *  @access    User
 *  @returns   status
 */
router.get('/', async (req: Request, res: Response) => {
  const orders = await getOrders();

  res.status(201).json(orders);
});

export { router as getOrdersRouter };
