import { body } from 'express-validator/src/middlewares/validation-chain-builders';

const nameValidation = body('name')
  .isString()
  .withMessage('User name must be String')
  .not()
  .isEmpty()
  .withMessage('User name is required')
  .isLength({ min: 3 })
  .withMessage('User name must be min 3 characters long')
  .trim();

const mobileValidation = body('mobile')
  .isNumeric()
  .withMessage('Please enter only number')
  .not()
  .isEmpty()
  .withMessage('Mobile no. is required')
  .isLength({ min: 10, max: 10 })
  .withMessage('Please enter valid mobile number')
  .trim();

const emailValidation = body('email')
  .isEmail()
  .withMessage('Please enter valid Email format')
  .trim()
  .not()
  .isEmpty()
  .withMessage('Email is required')
  .normalizeEmail()
  .isLength({ min: 3 })
  .withMessage('Email must be min 6 characters long');

const passwordValidation = body('password')
  .not()
  .isEmpty()
  .withMessage('Password is required')
  .isLength({ min: 6 })
  .withMessage('Password must be min 6 characters long')
  .trim();

const otpValidation = body('otp')
  .isNumeric()
  .withMessage('Please enter only number')
  .not()
  .isEmpty()
  .withMessage('OTP. is required')
  .isLength({ min: 4, max: 4 })
  .withMessage('Please enter valid OTP')
  .trim();

export {
  emailValidation,
  mobileValidation,
  nameValidation,
  otpValidation,
  passwordValidation,
};
