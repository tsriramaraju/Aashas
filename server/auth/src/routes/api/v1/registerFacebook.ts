import { AccountDoc } from '@aashas/common';
import express, { Request, Response } from 'express';
import { userInfo } from 'os';
import { authenticate } from 'passport';

import '../../../config/OAuth/facebook';
import { jwtPayload } from '../../../interfaces';
import { generateJWT } from '../../../utils';

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
export { router as FacebookRegister };
