import { Router, Request, Response } from 'express';
import { mobilePayload } from '../../../interfaces';
import { GenerateOTPPublisher } from '../../../events';
import { checkAvailability, initiateOTP } from '../../../services';
import {
  nameValidation,
  mobileValidation,
  BadRequestError,
  validateRequest,
  natsWrapper,
} from '@aashas/common';

const router = Router();

/**
 *  @desc      creates a record in OTP for  further verification
 *  @route     POST /api/v1/auth/new-mobile
 *  @access    Public
 *  @returns   status
 */
router.post(
  '/new-mobile',
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

export { router as mobileRegistration };
