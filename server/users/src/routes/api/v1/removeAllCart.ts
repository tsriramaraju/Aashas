import { currentUser, isUser } from '@aashas/common';
import { Router, Request, Response } from 'express';

import { removeCart } from '../../../services/removeCart';

const router = Router();

/**
 *  @desc      Remove all Cart items
 *  @route     Delete /api/v1/users/cart
 *  @access    User
 *  @returns   Status
 */

router.delete(
  '/cart',
  [currentUser, isUser],
  async (req: Request, res: Response) => {
    const status = await removeCart({
      userId: req.currentUser!.id,
    });
    res.status(201).json({ msg: status });
  }
);

export { router as removeAllCart };
