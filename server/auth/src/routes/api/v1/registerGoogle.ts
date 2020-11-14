import express, { Request, Response } from 'express';
import passport from 'passport';

const router = express.Router();

/**
 *  @desc      Create new account with google oauth
 *  @route     POST /api/v1/auth/new-google
 *  @access    Public
 *  @returns   JWT token
 */
router.get(
  '/new-google',
  passport.authenticate('google', { scope: ['profile'] })
);

export { router as GoogleRegister };
