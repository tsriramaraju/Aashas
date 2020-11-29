import { currentUser, isUser } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { getCustomProducts } from '../../../services/getCustomProducts';

const router = Router();

/**
 *  @desc      Get user Custom Products
 *  @route     Get /api/v1/users/custom
 *  @access    User
 *  @returns   Custom products
 */

router.get(
  '/custom',
  [currentUser, isUser],
  async (req: Request, res: Response) => {
    const data = await getCustomProducts(req.currentUser!.id);
    res.status(201).json(data);
  }
);
//  TODO : add test cases later
export { router as getOrders };
