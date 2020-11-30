import { isUser } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { getUser } from '../../../services/getUsers';

const router = Router();

/**
 *  @desc      Get user details
 *  @route     Get /api/v1/users
 *  @access    User
 *  @returns   Status
 */

router.get('/', [isUser], async (req: Request, res: Response) => {
  const data = await getUser(req.currentUser?.id!, false);
  res.status(201).send(data);
});

export { router as getUserFull };
