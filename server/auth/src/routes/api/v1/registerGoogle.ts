import express from 'express';
import '../../../config/OAuth/google';
import { authenticate } from 'passport';
import { AccountDoc, jwtPayload } from '@aashas/common';
import { generateJWT } from '../../../utils';

const router = express.Router();

/**
 *  @desc      initiates google oauth
 *  @route     GET /api/v1/auth/google
 *  @access    Public
 *  @returns   redirects to callback from google
 */
router.get('/google', authenticate('google', { scope: ['profile', 'email'] }));

/**
 *  @desc      Call back route from google oauth
 *  @route     GET /api/v1/auth/google/callback
 *  @access    Public
 *  @returns   JWT on success oauth
 */

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
      isAdmin: user.isAdmin,
    };

    res.json(generateJWT(payload));
  }
);

/**
 *  @desc      fall back route if oauth login fails
 *  @route     GET /api/v1/auth/failure
 *  @access    Public
 *  @returns   redirect url to client login page
 */

router.get('/failure', (req, res) => {
  //  TODO : change later to login client route
  res.redirect('https://www.google.com');
});

export { router as GoogleRegister };
