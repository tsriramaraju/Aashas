import express, { Request, Response } from 'express';
import { authenticate } from 'passport';

import '../../../config/OAuth/google';

const router = express.Router();

/**
 *  @desc      Create new account with google oauth
 *  @route     POST /api/v1/auth/google
 *  @access    Public
 *  @returns   JWT token
 */

router.get('/google', authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback/',
  authenticate('google', { failureRedirect: '/failure' }),
  (req, res) => {
    res.json(req.user);
  }
);
export { router as GoogleRegister };
