import { ResourceNotFoundError, natsWrapper } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { GenerateOTPPublisher } from '../../../events';
import { jwtPayload } from '../../../interfaces';
import { isUser } from '../../../middlewares/isUser';
import { checkAvailability, getAccounts, initiateOTP } from '../../../services';
import { generateJWT } from '../../../utils';

const router = Router();

/**
 *  @desc      Add new mobile \ email for contact by  generating new otp and setting verification to pending
 *  @route     POST /api/v1/auth/update-contact
 *  @access    Public
 *  @returns   jwt
 */

router.post('/update-contact', isUser, async (req: Request, res: Response) => {
  const { email } = req.body;
  const mobile = +req.body.mobile;
  const { id, name } = req.user!;
  const exists = await checkAvailability(email || mobile);
  const mode = email == undefined ? 'mobile' : 'email';

  //Makes sure  contact info doesn't exists in Accounts database
  if (!exists) {
    throw new ResourceNotFoundError(`${mode} already exists`);
  }

  const otpData = await initiateOTP(mode == 'email' ? email : mobile, name, id);

  //Makes sure OTP data exists
  if (otpData) {
    // Publishes OTP event
    new GenerateOTPPublisher(natsWrapper.client).publish({
      mode,
      data: {
        name: otpData.name,
        title: 'Please enter 4 digit OTP for verification',
        otp: otpData.otp,
        email: otpData.email,
        mobile: otpData.mobile,
      },
    });
    const user = await getAccounts(id);
    const jwt: jwtPayload = {
      id,
      name,
      email: user[0].email,
      emailVerified: user[0].emailVerified,
      mobileVerified: user[0].mobileVerified,
    };

    res.status(201).json(generateJWT(jwt));
  }
});

export { router as updateContact };
