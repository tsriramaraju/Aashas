import 'colors';
import 'express-async-errors';
import express, { json } from 'express';
import * as routes from './routes/api/v1';
import { deserializeUser, initialize, serializeUser } from 'passport';
import { errorHandler, loggers, NotFoundError, security } from '@aashas/common';

/**
 * initiate express app and body parser for json requests
 */
const app = express();
app.use(json());

app.set('trust proxy', true);

//clear base logs
console.clear();
security(app);
process.env.NODE_ENV !== 'test' && loggers(app);

/**
 * passport middlewares
 */
app.use(initialize());

serializeUser(function (user, cb) {
  cb(null, user);
});

deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/**
 * Auth service routes
 */
app.use('/api/v1/auth', routes.emailRegistrationRouter);
app.use('/api/v1/auth', routes.mobileRegistrationRouter);
app.use('/api/v1/auth', routes.verifyRegistrationRouter);
app.use('/api/v1/auth', routes.emailLoginRouter);
app.use('/api/v1/auth', routes.getAccountsRouter);
app.use('/api/v1/auth', routes.forgotPasswordRouter);
app.use('/api/v1/auth', routes.mobileLoginRouter);
app.use('/api/v1/auth', routes.passwordResetRouter);
app.use('/api/v1/auth', routes.verifyLoginRouter);
app.use('/api/v1/auth', routes.resendOTPRouter);
app.use('/api/v1/auth', routes.updateContactRouter);
app.use('/api/v1/auth', routes.GoogleRegisterRouter);
app.use('/api/v1/auth', routes.FacebookRegisterRouter);

/**
 * 404 route
 */
app.all('*', async (req, res) => {
  res.json(req.body);
  throw new NotFoundError();
});

/**
 * Custom error handling middleware
 */
app.use(errorHandler);

export { app };
