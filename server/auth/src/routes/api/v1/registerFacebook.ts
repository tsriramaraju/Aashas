import express, { Request, Response } from 'express';
import { authenticate } from 'passport';

import '../../../config/OAuth/facebook';

const router = express.Router();

/**
 *  @desc      Create new account with facebook oauth
 *  @route     POST /api/v1/auth/facebook
 *  @access    Public
 *  @returns   JWT token
 */

router.get(
  '/facebook',
  authenticate('facebook', { scope: ['public_profile', 'email'] })
);

router.get(
  '/facebook/callback/',
  authenticate('facebook', { failureRedirect: '/failure' }),
  (req, res) => {
    res.json(req.user);
  }
);
export { router as FacebookRegister };
