import { isAdmin } from './../../../middlewares/isAdmin';
import { getAccounts } from './../../../services';
import { Router, Request, Response } from 'express';
import { DatabaseConnectionError } from '@aashas/common';

const router = Router();

/**
 *  @desc      list all the account's available
 *  @route     GET /api/v1/auth/super/get
 *  @access    Admin
 *  @returns   List of accounts
 */
router.get('/super/get', isAdmin, async (req: Request, res: Response) => {
  const users = await getAccounts();
  res.status(201).json(users);
});

export { router as getAccounts };
