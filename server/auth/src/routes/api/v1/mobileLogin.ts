import { Router, Request, Response } from 'express';
import { GenerateOTPPublisher } from '../../../events';
import { checkAvailability, initiateOTP } from '../../../services';
import {
  mobileValidation,
  natsWrapper,
  ResourceNotFoundError,
  validateRequest,
} from '@aashas/common';

const router = Router();

/**
 *  @desc      Generated OTP record
 *  @route     POST /api/v1/auth/mobile-login
 *  @access    Public
 *  @returns   Status
 */
router.post(
  '/mobile-login',
  [mobileValidation, validateRequest],
  async (req: Request, res: Response) => {
    const mobile = +req.body.mobile;

    const availability = await checkAvailability(mobile);
    //Makes sure mobile no. exists
    if (!availability) {
      throw new ResourceNotFoundError("Mobile no. doesn't exists");
    }

    const otpData = await initiateOTP(mobile, 'name');
    //Makes sure OTP data exists
    if (otpData) {
      // Publishes OTP event
      new GenerateOTPPublisher(natsWrapper.client).publish({
        mode: 'mobile',
        data: {
          name: otpData.name,
          title: 'Please enter 4 digit OTP for verification',
          otp: otpData.otp,
          mobile: otpData.mobile,
        },
      });

      res.status(201).json('OTP has been sent to your mobile');
    }
  }
);

export { router as mobileLogin };
