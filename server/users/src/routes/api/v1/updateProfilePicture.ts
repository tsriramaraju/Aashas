import { BadRequestError } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { isUser } from '../../../middlewares/isUser';
import { updateProfilePic } from '../../../services/udpateProfilePic';

const router = Router();

/**
 *  @desc      updates profile picture
 *  @route     PUT /api/v1/users/image
 *  @access    User
 *  @returns   Status
 */

router.put('/image', isUser, async (req: Request, res: Response) => {
  const { image } = req.body;

  const status = await updateProfilePic({ id: req.user!.id, pic: image });

  res.status(201).json({ msg: status });
});

export { router as updateUser };
