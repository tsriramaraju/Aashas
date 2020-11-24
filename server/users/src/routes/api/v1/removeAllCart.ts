import { Router, Request, Response } from 'express';

import { isUser } from '../../../middlewares/isUser';
import { removeCart } from '../../../services/removeCart';
import { removeFavourites } from '../../../services/removeFavourites';

const router = Router();

/**
 *  @desc      Remove all Cart items
 *  @route     Delete /api/v1/users/cart
 *  @access    User
 *  @returns   Status
 */

router.delete('/cart', isUser, async (req: Request, res: Response) => {
  const status = await removeCart({
    userId: req.user!.id,
  });
  res.status(201).json({ msg: status });
  //  TODO : user updated event
});

export { router as removeAllCart };
