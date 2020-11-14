import { generateJWT } from '../../../utils';
import { verifyOTP } from '../../../services';
import { jwtPayload } from '../../../interfaces';
import { Router, Request, Response } from 'express';
import { AccountCreatedPublisher } from '../../../events';
import { authType, BadRequestError, natsWrapper } from '@aashas/common';

const router = Router();

/**
 *  @desc      Verifies the otp and and updates the verification status in users account and also creates   account for mobile signup users
 *  @route     POST /api/v1/auth/verify-register
 *  @access    Public
 *  @returns    status or jwt
 */
router.post('/verify-register', async (req: Request, res: Response) => {
  const email = req.body.email;
  const mobile = +req.body.mobile;
  const otp = +req.body.otp;

  //Makes sure user submits at least one parameter
  if (!email && !mobile)
    throw new BadRequestError('invalid request, No valid parameters are found');

  //Makes sure user submits only one parameter
  if (email && mobile)
    throw new BadRequestError('invalid request, use only one parameter');
  //Makes sure otp is 4digit and submitted
  if (!otp || !otp.toString().match(/^[0-9]{4}$/)) {
    throw new BadRequestError('Enter valid otp');
  }

  //Changes verification status for the user
  if (email) {
    await verifyOTP(otp, email);
    res.status(201).json({ msg: 'successfully verified' });
  }

  //Creates user record with verified status
  if (mobile) {
    const user = await verifyOTP(otp, mobile);
    if (user) {
      const payload: jwtPayload = {
        id: user.id,
        name: user.name,
        emailVerified: user.emailVerified,
        mobileVerified: user.mobileVerified,
      };

      res.status(201).json(generateJWT(payload, 100));

      //Publish account created event
      if (!user.email)
        new AccountCreatedPublisher(natsWrapper.client).publish({
          id: user.id,
          data: {
            authMode: authType.mobile,
            id: user.id,
            name: user.name!,
            mobile: user.mobile,
          },
        });
    }
  }
});

export { router as verifyRegistration };
