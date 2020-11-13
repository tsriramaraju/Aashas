import { Router, Request, Response } from 'express';
import { jwtPayload } from '../../../interfaces';
import { verifyReset } from '../../../services';
import { generateJWT } from '../../../utils';
import {
  BadRequestError,
  emailValidation,
  passwordValidation,
  validateRequest,
} from '@aashas/common';

const router = Router();

/**
 *  @desc      verify password reset link and update password
 *  @route     POST /api/v1/auth/reset-password/:id
 *  @access    Public
 *  @returns   JWT token
 */
router.post(
  '/reset-password/:id',
  [passwordValidation, emailValidation, validateRequest],
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { email, password } = req.body;

    //Makes sure ID isn't tampered
    if (!id) {
      throw new BadRequestError('Please use valid reset link');
    }

    const user = await verifyReset(id, password, email);

    if (user) {
      const payload: jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        mobileVerified: user.mobileVerified,
      };

      res.status(201).json(generateJWT(payload, 100));
    }
  }
);

export { router as passwordReset };
