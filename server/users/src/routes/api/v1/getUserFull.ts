import { Router, Request, Response } from 'express';
import { isUser } from '../../../middlewares/isUser';
import { getUser } from '../../../services/getUsers';

const router = Router();

/**
 *  @desc      Get user details
 *  @route     Get /api/v1/users
 *  @access    User
 *  @returns   Status
 */

router.get('/', isUser, async (req: Request, res: Response) => {
  const data = await getUser(req.user?.id!, false);
  res.status(201).send(data);
});

export { router as getUserFull };
