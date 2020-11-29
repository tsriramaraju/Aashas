import { isUser } from '@aashas/common';
import { Router, Request, Response } from 'express';

import { removeFavourites } from '../../../services/removeFavourites';

const router = Router();

/**
 *  @desc      Remove all favourites
 *  @route     Delete /api/v1/users/favourites
 *  @access    User
 *  @returns   Status
 */

router.delete('/favourites', [isUser], async (req: Request, res: Response) => {
  const status = await removeFavourites({
    userId: req.currentUser!.id,
  });
  res.status(201).json({ msg: status });
});

export { router as removeAllFavourites };
