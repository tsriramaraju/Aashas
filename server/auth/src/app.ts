import express, { json } from 'express';
import 'express-async-errors';
import 'colors';
import { errorHandler, loggers, NotFoundError, security } from '@aashas/common';
import {
  emailRegistrationRouter,
  mobileRegistrationRouter,
  verifyRegistrationRoute,
  emailLoginRoute,
  getAccountsRouter,
  forgotPasswordRoute,
  mobileLoginRouter,
  passwordResetRoute,
  verifyLoginRoute,
  resendOTPRouter,
} from './routes/api/v1';

const app = express();
app.set('trust proxy', true);
app.use(json());

console.clear();
security(app);
process.env.NODE_ENV !== 'test' && loggers(app);

/**
 * Auth service routes
 */
app.use('/api/v1/auth', emailRegistrationRouter);
app.use('/api/v1/auth', mobileRegistrationRouter);
app.use('/api/v1/auth', verifyRegistrationRoute);
app.use('/api/v1/auth', emailLoginRoute);
app.use('/api/v1/auth', getAccountsRouter);
app.use('/api/v1/auth', forgotPasswordRoute);
app.use('/api/v1/auth', mobileLoginRouter);
app.use('/api/v1/auth', passwordResetRoute);
app.use('/api/v1/auth', verifyLoginRoute);
app.use('/api/v1/auth', resendOTPRouter);

/**
 * 404 route
 */
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

/**
 * Custom error handling middleware
 */
app.use(errorHandler);

export { app };
