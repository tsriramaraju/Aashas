import { BadRequestError, isUser } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';

import { addFavourite } from '../../../services/addFavourites';

const router = Router();

/**
 *  @desc      Add new favourites
 *  @route     Post /api/v1/users/favourites
 *  @access    User
 *  @returns   Status
 */

router.post('/favourites', [isUser], async (req: Request, res: Response) => {
  const product = req.body.product as Types.ObjectId;

  if (!product) throw new BadRequestError('Product id not found');
  if (!Types.ObjectId.isValid(product))
    throw new BadRequestError('Invalid product id');

  const status = await addFavourite({
    prodId: product,
    userId: req.currentUser!.id,
  });
  if (!status) throw new BadRequestError("User don't exist");
  res.status(201).json({ msg: status });
});

export { router as addFavourites };
