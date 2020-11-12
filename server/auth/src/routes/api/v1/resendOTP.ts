import { Router, Request, Response } from 'express';
import {
  emailValidation,
  validateRequest,
  ResourceNotFoundError,
  natsWrapper,
} from '@aashas/common';
import { GenerateOTPPublisher } from '../../../events';
import { checkAvailability, initiateOTP } from '../../../services';

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

    const exists = await checkAvailability(email);
    //Makes sure  email exists in Accounts database
    if (!exists) {
      throw new ResourceNotFoundError("Email doesn't exists");
    }

    const otpData = await initiateOTP(email, 'name');

    //Makes sure OTP data exists
    if (otpData) {
      // Publishes OTP event
      new GenerateOTPPublisher(natsWrapper.client).publish({
        mode: 'email',
        data: {
          name: otpData.name,
          title: 'Please enter 4 digit OTP for verification',
          otp: otpData.otp,
          email: otpData.email,
        },
      });

      res.status(201).json('OTP has been sent to your email');
    }
  }
);

export { router as resendOTPRouter };
