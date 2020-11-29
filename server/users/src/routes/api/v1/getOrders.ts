import { currentUser, isUser } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { getOrder } from '../../../services/getOrders';

const router = Router();

/**
 *  @desc      Get user Orders
 *  @route     Get /api/v1/users/orders
 *  @access    User
 *  @returns   Orders
 */

router.get(
  '/orders',
  [currentUser, isUser],
  async (req: Request, res: Response) => {
    const data = await getOrder(req.currentUser!.id);
    res.status(201).json(data);
  }
);

export { router as getOrders };
