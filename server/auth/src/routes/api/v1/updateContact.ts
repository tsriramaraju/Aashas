import { generateJWT } from '../../../utils';
import { Router, Request, Response } from 'express';
import { GenerateOTPPublisher } from '../../../events';
import { checkAvailability, getAccounts, initiateOTP } from '../../../services';
import {
  ResourceNotFoundError,
  natsWrapper,
  BadRequestError,
  DatabaseConnectionError,
  jwtPayload,
  isUser,
} from '@aashas/common';

const router = Router();

/**
 *  @desc      Add new mobile \ email for contact by  generating new otp and setting verification to pending
 *  @route     POST /api/v1/auth/update-contact
 *  @access    Public
 *  @returns   jwt
 */

router.post(
  '/update-contact',
  [isUser],
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const mobile = +req.body.mobile;
    const { id, name } = req.currentUser!;

    //Makes sure user submits at least one parameter
    if (!email && !mobile)
      throw new BadRequestError(
        'invalid request, No valid parameters are found'
      );

    //Makes sure user submits only one parameter
    if (email && mobile)
      throw new BadRequestError('invalid request, use only one parameter');

    const exists = await checkAvailability(email || mobile);
    const mode = email == undefined ? 'mobile' : 'email';

    //Makes sure  contact info doesn't exists in Accounts database
    if (exists) throw new ResourceNotFoundError(`${mode} already exists`);

    const user = await getAccounts(id);

    if (user[0]) {
      const otpData = await initiateOTP(
        mode == 'email' ? email : mobile,
        name,
        id
      );

      //Makes sure OTP data exists
      if (otpData) {
        // Publishes OTP event
        new GenerateOTPPublisher(natsWrapper.client).publish({
          mode: [mode],
          data: {
            name: otpData.name,
            title: 'Please enter 4 digit OTP for verification',
            otp: otpData.otp,
            email: otpData.email,
            mobile: otpData.mobile,
            message: 'Message',
          },
        });

        const jwt: jwtPayload = {
          id,
          name,
          email: user[0].email,
          emailVerified: user[0].emailVerified,
          mobileVerified: user[0].mobileVerified,
          isAdmin: user[0].isAdmin,
        };

        res.status(201).json(generateJWT(jwt));
      }
      throw new DatabaseConnectionError();
    }
    throw new ResourceNotFoundError("User don't exist");
  }
);

export { router as updateContact };
