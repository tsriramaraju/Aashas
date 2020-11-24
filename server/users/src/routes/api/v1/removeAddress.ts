import { BadRequestError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { isUser } from '../../../middlewares/isUser';
import { removeAddress } from '../../../services/removeAddress';

const router = Router();

/**
 *  @desc     Deletes Given address
 *  @route     DELETE /api/v1/users/address/:id
 *  @access    User
 *  @returns   Status
 */

router.delete('/address/:id', isUser, async (req: Request, res: Response) => {
  const addressId = req.params.id;
  const userId = req.user!.id;

  if (!Types.ObjectId.isValid(addressId))
    throw new BadRequestError('Invalid address ID');

  const status = await removeAddress({
    addressId: Types.ObjectId(addressId),
    userId,
  });
  //  TODO : user updated event
  res.status(201).json({ msg: status });
});

export { router as removeAddress };
