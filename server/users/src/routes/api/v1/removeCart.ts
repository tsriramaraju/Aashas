import { BadRequestError, isUser } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { removeCart } from '../../../services/removeCart';

const router = Router();

/**
 *  @desc      Remove  cart
 *  @route     Delete /api/v1/users/cart/:id
 *  @access    User
 *  @returns   Status
 */

router.delete('/cart/:id', [isUser], async (req: Request, res: Response) => {
  const product = req.params.id;

  if (!Types.ObjectId.isValid(product))
    throw new BadRequestError('Invalid product id');

  const status = await removeCart({
    prodId: product,
    userId: req.currentUser!.id,
  });
  res.status(201).json({ msg: status });
});

export { router as removeCart };
