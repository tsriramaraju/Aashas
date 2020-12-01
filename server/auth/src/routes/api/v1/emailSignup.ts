import { generateJWT } from '../../../utils';
import express, { Request, Response } from 'express';
import { GenerateOTPPublisher, AccountCreatedPublisher } from '../../../events';
import {
  checkAvailability,
  registerByEmail,
  initiateOTP,
} from '../../../services';
import {
  emailValidation,
  nameValidation,
  passwordValidation,
  BadRequestError,
  validateRequest,
  natsWrapper,
  authType,
  DatabaseConnectionError,
  emailPayload,
  jwtPayload,
} from '@aashas/common';

const router = express.Router();

/**
 *  @desc      Create new account with email and password
 *  @route     POST /api/v1/auth/email-register
 *  @access    Public
 *  @returns   JWT token
 */
router.post(
  '/email-register',
  [nameValidation, emailValidation, passwordValidation, validateRequest],
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body as emailPayload;

    const exists = await checkAvailability(email);
    //Makes sure email id doesn't exist
    if (exists) {
      throw new BadRequestError('Email already exists');
    }

    //Creates account in database with verification status as pending
    const user = await registerByEmail(name, email, password);

    //Makes sure user is created
    if (!user) throw new DatabaseConnectionError('Failed registering user');
    const otpData = await initiateOTP(user.email!, user.name!);

    //Return payload  with registered user data
    const payload: jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      mobileVerified: user.mobileVerified,
      isAdmin: user.isAdmin,
    };

    //Publishes Account created event once the user is registered
    new AccountCreatedPublisher(natsWrapper.client).publish({
      id: user.id,

      authMode: authType.email,

      name: user.name,
      email: user.email,
    });

    //Makes sure OTP is created
    if (!otpData)
      throw new DatabaseConnectionError(
        'Failed Generating OTP, Please request again later'
      );

    //Publishes Generate OTP event once the OTP is registered
    new GenerateOTPPublisher(natsWrapper.client).publish({
      id: otpData.id,
      mode: ['email'],
      data: {
        name: otpData.name,
        otp: otpData.otp,
        email: otpData.email,
        title: 'Please enter 4 digit OTP to verify the email',
        message: 'this is message',
      },
    });
    res.status(201).json(generateJWT(payload));
  }
);

export { router as emailRegistrationRouter };
