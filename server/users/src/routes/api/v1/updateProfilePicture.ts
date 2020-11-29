import {
  BadRequestError,
  currentUser,
  isUser,
  natsWrapper,
} from '@aashas/common';
import { Router, Request, Response } from 'express';
import { UserUpdatedPublisher } from '../../../events/publishers/userUpdated';
import { queueGroupName } from '../../../events/queueGroupName';
import { updateProfilePic } from '../../../services/updateProfilePic';

const router = Router();

/**
 *  @desc      updates profile picture
 *  @route     PUT /api/v1/users/image
 *  @access    User
 *  @returns   Status
 */

router.put(
  '/image',
  [currentUser, isUser],
  async (req: Request, res: Response) => {
    const { image } = req.body;
    const { id, email } = req.currentUser!;

    const status = await updateProfilePic({
      id: req.currentUser!.id,
      pic: image,
    });

    res.status(201).json({ msg: status });

    new UserUpdatedPublisher(natsWrapper.client).publish({
      id,
      mode: 'email',
      group: queueGroupName,
      data: {
        body: `Profile picture updated successfully`,
        message: 'Profile picture updated successfully',
        email,
        title: 'Profile picture updated ',
      },
    });
  }
);

export { router as updateUser };
