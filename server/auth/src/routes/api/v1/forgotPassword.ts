import { Router, Request, Response } from 'express';
import { GenerateResetPublisher } from './../../../events';
import { checkAvailability, initiateReset } from '../../../services';
import {
  BadRequestError,
  emailValidation,
  natsWrapper,
  ServerError,
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

    const availability = await checkAvailability(email);
    //Makes sure that email exist in Accounts DB
    if (!availability) {
      throw new BadRequestError("Email doesn't exists");
    }

    const resetData = await initiateReset(email);

    //Makes sure resetData exists
    if (resetData) {
      //Publishes reset link event to the user
      new GenerateResetPublisher(natsWrapper.client).publish({
        mode: 'email',
        data: {
          title: 'Please follow this link to reset the password',
          uid: resetData.uid,
          email: resetData.email,
        },
      });

      res.status(201).json({ msg: 'Reset link have been sent to your email.' });
    }
  }
);

export { router as forgotPasswordRoute };
