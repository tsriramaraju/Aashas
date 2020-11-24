import { BadRequestError } from '@aashas/common';
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

  if (!product) throw new BadRequestError('Product id not found');
  if (!Types.ObjectId.isValid(product))
    throw new BadRequestError('Invalid product id');

  const status = await addCart({ prodId: product, userId: req.user!.id });
  res.status(201).json({ msg: status });

  //  TODO : user updated event
});

export { router as addCart };
