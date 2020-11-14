import { AccountDoc } from '@aashas/common';
import express, { Request, Response } from 'express';
import { authenticate } from 'passport';

import '../../../config/OAuth/google';
import { jwtPayload } from '../../../interfaces';
import { generateJWT } from '../../../utils';

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
    const user = req.user as AccountDoc;

    const payload: jwtPayload = {
      id: user.id,
      emailVerified: user.emailVerified,
      mobileVerified: user.mobileVerified,
      name: user.name,
      email: user.email,
    };

    res.json(generateJWT(payload));
  }
);
export { router as GoogleRegister };
