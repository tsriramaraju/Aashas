import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { isUser } from '../../../middlewares/isUser';
import { removeCart } from '../../../services/removeCart';

const router = Router();

/**
 *  @desc      Remove  cart
 *  @route     Delete /api/v1/users/cart/:id
 *  @access    User
 *  @returns   Status
 */

router.delete('/cart', isUser, async (req: Request, res: Response) => {
  const product = req.params.id;

  const status = await removeCart({
    prodId: Types.ObjectId(product),
    userId: req.user!.id,
  });
  res.status(201).json(status);
});

export { router as removeCart };
