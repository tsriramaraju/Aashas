import { isUser } from '@aashas/common';
import { Router, Request, Response } from 'express';

import { getUser } from '../../../services/getUsers';

const router = Router();

/**
 *  @desc      Get user Basic details
 *  @route     Get /api/v1/users/ lean
 *  @access    User
 *  @returns   Status
 */

router.get('/lean', [isUser], async (req: Request, res: Response) => {
  const data = await getUser(req.currentUser?.id!, true);
  res.status(201).send(data);
});

export { router as getUserLean };
