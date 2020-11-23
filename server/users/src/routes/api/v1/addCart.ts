import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { isUser } from '../../../middlewares/isUser';
import { addCart } from '../../../services/addCart';

const router = Router();

/**
 *  @desc      Add new cart
 *  @route     Post /api/v1/users/cart
 *  @access    User
 *  @returns   Status
 */

router.post('/cart', isUser, async (req: Request, res: Response) => {
  const product = req.body.product as Types.ObjectId;

  const status = await addCart({ prodId: product, userId: req.user!.id });
  res.status(201).json(status);
});

export { router as addCart };
