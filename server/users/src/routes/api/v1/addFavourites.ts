import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { isUser } from '../../../middlewares/isUser';
import { addFavourite } from '../../../services/addFavourites';

const router = Router();

/**
 *  @desc      Add new favourites
 *  @route     Post /api/v1/users/favourites
 *  @access    User
 *  @returns   Status
 */

router.post('/favourites', isUser, async (req: Request, res: Response) => {
  const product = req.body.product as Types.ObjectId;

  const status = await addFavourite({ prodId: product, userId: req.user!.id });
  res.status(201).json(status);
});

export { router as addFavourites };
