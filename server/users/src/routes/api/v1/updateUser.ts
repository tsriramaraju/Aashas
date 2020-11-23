import { userAttrs } from '@aashas/common';
import { Router, Request, Response } from 'express';

const router = Router();

/**
 *  @desc      Update user details
 *  @route     PUT /api/v1/users
 *  @access    User
 *  @returns   Status
 */

router.put('/', async (req: Request, res: Response) => {
  const {
    addresses,
    name,
    cart,
    customProducts,
    favourites,
    image,
  } = req.body as userAttrs;
});

export { router as updateUser };
