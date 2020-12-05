import { BadRequestError, isUser } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { removeFavourites } from '../../../services/removeFavourites';

const router = Router();

/**
 *  @desc      Remove  favourites
 *  @route     Delete /api/v1/users/favourites/:id
 *  @access    User
 *  @returns   Status
 */

router.delete(
  '/favourites/:id',
  [isUser],
  async (req: Request, res: Response) => {
    const product = req.params.id;
    if (!Types.ObjectId.isValid(product))
      throw new BadRequestError('Invalid product id');

    const status = await removeFavourites({
      prodId: product,
      userId: req.currentUser!.id,
    });
    res.status(201).json({ msg: status });
  }
);

export { router as removeFavourites };
