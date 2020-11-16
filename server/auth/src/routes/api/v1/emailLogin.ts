import { Router, Request, Response } from 'express';
import { checkAvailability } from './../../../services';
import { compareHash, generateJWT } from '../../../utils';
import {
  emailValidation,
  passwordValidation,
  validateRequest,
  ResourceNotFoundError,
  BadRequestError,
} from '@aashas/common';

const router = Router();

/**
 *  @desc      Login with email and password
 *  @route     POST /api/v1/auth/email-login
 *  @access    Public
 *  @returns   Jwt payload
 */
router.post(
  '/email-login',
  [emailValidation, passwordValidation, validateRequest],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    //find existing user
    const user = await checkAvailability(email);

    //Makes sure user exists
    if (!user) {
      throw new ResourceNotFoundError('User not found');
    }

    //Makes sure that user isn't from oauth
    if (user.googleID) throw new BadRequestError('Please use google singIn');
    if (user.facebookID)
      throw new BadRequestError('Please use facebook singIn');

    //updates last login time
    user.lastLogin = Date.now().toString();
    await user.save();

    //Makes sure user enters valid password
    const validation = await compareHash(password, user.password!);
    if (!validation) throw new BadRequestError('Invalid password');

    //Return valid JWT token upon successful entry
    return res.status(201).json(
      generateJWT({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        mobileVerified: user.mobileVerified,
      })
    );
  }
);

export { router as emailLogin };
