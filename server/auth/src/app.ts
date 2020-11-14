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
app.use('/api/v1/auth', routes.emailRegistration);
app.use('/api/v1/auth', routes.mobileRegistration);
app.use('/api/v1/auth', routes.verifyRegistration);
app.use('/api/v1/auth', routes.emailLogin);
app.use('/api/v1/auth', routes.getAccounts);
app.use('/api/v1/auth', routes.forgotPassword);
app.use('/api/v1/auth', routes.mobileLogin);
app.use('/api/v1/auth', routes.passwordReset);
app.use('/api/v1/auth', routes.verifyLogin);
app.use('/api/v1/auth', routes.resendOTP);
app.use('/api/v1/auth', routes.updateContact);
app.use('/api/v1/auth', routes.GoogleRegister);
app.use('/api/v1/auth', routes.FacebookRegister);

/**
 * 404 route
 */
app.all('*', async (req, res) => {
  console.log(req.body);
  res.json(req.body);
  throw new NotFoundError();
});

/**
 * Custom error handling middleware
 */
app.use(errorHandler);

export { app };
