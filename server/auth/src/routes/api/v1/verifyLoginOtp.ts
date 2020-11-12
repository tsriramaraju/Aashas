import { BadRequestError, natsWrapper, authType } from '@aashas/common';
import { Router, Request, Response } from 'express';
import { AccountCreatedPublisher } from '../../../events';
import { jwtPayload } from '../../../interfaces';
import { verifyOTP } from '../../../services';
import { generateJWT } from '../../../utils';

const router = Router();

/**
 *  @desc      verify mobile login otp
 *  @route     POST /api/v1/auth/login-mobile
 *  @access    Public
 *  @returns   JWT
 */
router.post('/verify-login', async (req: Request, res: Response) => {
  const mobile = +req.body.mobile;
  const otp = +req.body.otp;

  //Makes sure otp is 4digit and submitted
  if (!otp || !otp.toString().match(/^[0-9]{4}$/)) {
    throw new BadRequestError('Enter valid otp');
  }

  if (mobile) {
    const user = await verifyOTP(otp, mobile);
    //  TODO : check last login
    if (user) {
      user.lastLogin = Date.now().toString();
      await user.save();
      const payload: jwtPayload = {
        id: user.id,
        name: user.name!,
      };
      res.status(201).json(generateJWT(payload, 100));

      //  TODO : test order of evetns
      //Publish account created event
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

export { router as verifyLoginRoute };
