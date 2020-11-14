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
 *  @route     POST /api/v1/auth/login-email
 *  @access    Public
 *  @returns   Jwt payload
 */
router.post(
  '/login-email',
  [emailValidation, passwordValidation, validateRequest],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    //find existing user
    const user = await checkAvailability(email);

    //Makes sure user exists
    if (!user) {
      throw new ResourceNotFoundError('User not found');
    }

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
