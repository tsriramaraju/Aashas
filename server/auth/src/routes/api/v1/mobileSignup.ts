import { Router, Request, Response } from 'express';
import { GenerateOTPPublisher } from '../../../events';
import { checkAvailability, initiateOTP } from '../../../services';
import {
  nameValidation,
  mobileValidation,
  BadRequestError,
  validateRequest,
  natsWrapper,
  mobilePayload,
} from '@aashas/common';

const router = Router();

/**
 *  @desc      creates a record in OTP for  further verification
 *  @route     POST /api/v1/auth/mobile-register
 *  @access    Public
 *  @returns   status
 */
router.post(
  '/mobile-register',
  [nameValidation, mobileValidation, validateRequest],
  async (req: Request, res: Response) => {
    const { name, mobile } = req.body as mobilePayload;

    const availability = await checkAvailability(+mobile);
    //Makes sure mobile no. is available
    if (availability) {
      throw new BadRequestError('Mobile no. already exists');
    }

    const otpData = await initiateOTP(+mobile, name);

    //Makes sure OTP data exists
    if (otpData) {
      // Publishes OTP event
      new GenerateOTPPublisher(natsWrapper.client).publish({
        mode: ['mobile'],
        data: {
          name: otpData.name,
          title: 'Please enter 4 digit OTP for verification',
          otp: otpData.otp,
          mobile: otpData.mobile,
          message: 'message',
        },
      });

      res.status(201).json('OTP has been sent to your mobile');
    }
  }
);

export { router as mobileRegistration };
