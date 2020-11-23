import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { isUser } from '../../../middlewares/isUser';
import { removeFavourites } from '../../../services/removeFavourites';

const router = Router();

/**
 *  @desc      Remove  favourites
 *  @route     Delete /api/v1/users/favourites/:id
 *  @access    User
 *  @returns   Status
 */

router.delete('/favourites', isUser, async (req: Request, res: Response) => {
  const product = req.params.id;

  const status = await removeFavourites({
    prodId: Types.ObjectId(product),
    userId: req.user!.id,
  });
  res.status(201).json(status);
});

export { router as removeFavourites };
