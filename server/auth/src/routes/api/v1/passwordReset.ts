import { generateJWT } from '../../../utils';
import { verifyReset } from '../../../services';
import { Router, Request, Response } from 'express';
import {
  emailValidation,
  jwtPayload,
  passwordValidation,
  TamperedRequestError,
  validateRequest,
} from '@aashas/common';
import { Types } from 'mongoose';

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
    if (!id || !Types.ObjectId.isValid(id)) {
      throw new TamperedRequestError('Please use valid reset link');
    }

    const user = await verifyReset(Types.ObjectId(id), password, email);

    if (user) {
      const payload: jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        mobileVerified: user.mobileVerified,
        isAdmin: user.isAdmin,
      };

      res.status(201).json(generateJWT(payload));
    }
  }
);

export { router as passwordResetRouter };
