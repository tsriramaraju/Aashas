import { generateJWT } from '../../../utils';
import { verifyOTP } from '../../../services';
import {
  jwtPayload,
  mobileValidation,
  otpValidation,
  RequestValidationError,
  validateRequest,
} from '@aashas/common';
import { Router, Request, Response } from 'express';

const router = Router();

/**
 *  @desc      verify mobile login otp
 *  @route     POST /api/v1/auth/verify-login
 *  @access    Public
 *  @returns   JWT
 */
router.post(
  '/verify-login',
  [otpValidation, mobileValidation, validateRequest],
  async (req: Request, res: Response) => {
    const mobile = +req.body.mobile;
    const otp = +req.body.otp;

    if (mobile) {
      const user = await verifyOTP(otp, mobile);

      if (user) {
        user.lastLogin = Date.now().toString();
        await user.save();
        const payload: jwtPayload = {
          id: user.id,
          name: user.name!,
          emailVerified: user.emailVerified,
          mobileVerified: user.mobileVerified,
          isAdmin: user.isAdmin,
        };
        res.status(201).json(generateJWT(payload, 100));
      }
    }
  }
);

export { router as verifyLogin };
