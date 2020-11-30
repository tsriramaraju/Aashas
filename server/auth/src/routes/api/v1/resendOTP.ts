import { Router, Request, Response } from 'express';
import { GenerateOTPPublisher } from '../../../events';
import { checkAvailability, initiateOTP } from '../../../services';
import {
  emailValidation,
  validateRequest,
  ResourceNotFoundError,
  natsWrapper,
  verification,
  BadRequestError,
} from '@aashas/common';

const router = Router();

/**
 *  @desc      Resend otp for later email verification
 *  @route     POST /api/v1/auth/resend-otp
 *  @access    Public
 *  @returns   Status
 */
router.post(
  '/resend-otp',
  [emailValidation, validateRequest],
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await checkAvailability(email);
    //Makes sure  email exists in Accounts database
    if (!user) throw new ResourceNotFoundError("Email doesn't exists");

    //Makes sure email is not verified yet
    if (user.emailVerified == verification.yes)
      throw new BadRequestError('Email already verified');

    const otpData = await initiateOTP(email, 'name');

    //Makes sure OTP data exists
    if (otpData) {
      // Publishes OTP event
      new GenerateOTPPublisher(natsWrapper.client).publish({
        mode: ['email'],
        data: {
          name: otpData.name,
          title: 'Please enter 4 digit OTP for verification',
          otp: otpData.otp,
          email: otpData.email,
          message: 'message',
        },
      });

      res.status(201).json('OTP has been sent to your email');
    }
  }
);

export { router as resendOTP };
