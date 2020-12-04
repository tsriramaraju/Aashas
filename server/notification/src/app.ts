import 'colors';
import 'express-async-errors';
import express, { json } from 'express';
import { errorHandler, loggers, NotFoundError, security } from '@aashas/common';
import * as routes from './routes/api/v1';

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
 * Notification service routes
 */

app.use('/api/v1/notification', routes.getNotificationsRouter);
app.use('/api/v1/notification', routes.pushNotificationRouter);

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
