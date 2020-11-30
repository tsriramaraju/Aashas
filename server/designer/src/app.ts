import 'colors';
import 'express-async-errors';
import express, { json } from 'express';
import * as router from './routes/api/v1';
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
 *
 * Designer service routes
 */
app.use('/api/v1/designer', router.updateDesignerRouter);
app.use('/api/v1/designer', router.getDesignerInfoRouter);
app.use('/api/v1/designer', router.getBlogsRouter);
app.use('/api/v1/designer', router.getDesignerFullRouter);
app.use('/api/v1/designer', router.createBlogRouter);
app.use('/api/v1/designer', router.removeBlogRouter);
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
