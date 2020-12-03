import { BadRequestError, isUser, natsWrapper } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { UserUpdatedPublisher } from '../../../events/publishers/userUpdated';
import { queueGroupName } from '../../../events/queueGroupName';

import { removeAddress } from '../../../services/removeAddress';

const router = Router();

/**
 *  @desc     Deletes Given address
 *  @route     DELETE /api/v1/users/address/:id
 *  @access    User
 *  @returns   Status
 */

router.delete('/address/:id', [isUser], async (req: Request, res: Response) => {
  const addressId = req.params.id;
  const { id, name, email } = req.currentUser!;

  if (!Types.ObjectId.isValid(addressId))
    throw new BadRequestError('Invalid address ID');

  const status = await removeAddress({
    addressId: Types.ObjectId(addressId),
    userId: id,
  });

  res.status(201).json({ msg: status });

  new UserUpdatedPublisher(natsWrapper.client).publish({
    id,
    mode: ['email'],
    group: queueGroupName,
    data: {
      body: `Removed address successfully`,
      message: 'Address removed successfully',
      email,
      title: 'Address removed ',
    },
  });
});

export { router as removeAddress };
