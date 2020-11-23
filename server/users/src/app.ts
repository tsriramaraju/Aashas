import 'colors';
import 'express-async-errors';
import express, { json } from 'express';
import * as routes from './routes/api/v1';
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
 * Users service routes
 */
app.use('/api/v1/users', routes.getUserFull);
app.use('/api/v1/users', routes.getUserLean);
app.use('/api/v1/users', routes.updateUser);
app.use('/api/v1/users', routes.deleteUser);
app.use('/api/v1/users', routes.addAddress);
app.use('/api/v1/users', routes.removeAddress);

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
