import { Router, Request, Response } from 'express';
import { GenerateResetPublisher } from './../../../events';
import { checkAvailability, initiateReset } from '../../../services';
import {
  BadRequestError,
  emailValidation,
  natsWrapper,
  validateRequest,
} from '@aashas/common';

const router = Router();

/**
 *  @desc      Send reset link to user
 *  @route     POST /api/v1/auth/forgot-password
 *  @access    Public
 *  @returns   Success status
 */
router.post(
  '/forgot-email',
  [emailValidation, validateRequest],
  async (req: Request, res: Response) => {
    const email = req.body.email;

    const user = await checkAvailability(email);
    //Makes sure that email exist in Accounts DB
    if (!user) {
      throw new BadRequestError("Email doesn't exists");
    }

    //makes sure email is not from oauth
    if (user.googleID)
      throw new BadRequestError(
        'This email is registered with google oauth, please use google signIn'
      );
    else if (user.facebookID)
      throw new BadRequestError(
        'This email is registered with facebook oauth, please use facebook signIn'
      );

    const resetData = await initiateReset(email);

    //Makes sure resetData exists
    if (resetData) {
      //Publishes reset link event to the user
      new GenerateResetPublisher(natsWrapper.client).publish({
        mode: ['email'],
        data: {
          title: 'Please follow this link to reset the password',
          uid: resetData.uid,
          email: resetData.email,
          message: 'message',
        },
      });

      res.status(201).json({ msg: 'Reset link have been sent to your email.' });
    }
  }
);

export { router as forgotPasswordRouter };
