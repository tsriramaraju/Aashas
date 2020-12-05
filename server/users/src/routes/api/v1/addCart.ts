import { BadRequestError, isUser } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';

import { addCart } from '../../../services/addCart';

const router = Router();

/**
 *  @desc      Add new cart
 *  @route     Post /api/v1/users/cart
 *  @access    User
 *  @returns   Status
 */

router.post('/cart', [isUser], async (req: Request, res: Response) => {
  const product = req.body.product;

  if (!product) throw new BadRequestError('Product id not found');
  if (!Types.ObjectId.isValid(product))
    throw new BadRequestError('Invalid product id');

  const status = await addCart({
    prodId: product,
    userId: req.currentUser!.id,
  });

  if (!status) throw new BadRequestError("User don't exist");

  res.status(201).json({ msg: status });
});

export { router as addCart };
