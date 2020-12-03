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
 * Products service routes
 */
app.use('/api/v1/products', routes.createProductRouter);
app.use('/api/v1/products', routes.getProductsRouter);
app.use('/api/v1/products', routes.deleteProductRouter);
app.use('/api/v1/products', routes.updateProductRouter);
app.use('/api/v1/products', routes.getDesignerProductsRouter);
app.use('/api/v1/products', routes.getTrendingProductsRouter);
app.use('/api/v1/products', routes.getOfferProductsRouter);
app.use('/api/v1/products', routes.createOfferRouter);
app.use('/api/v1/products', routes.updateOfferRouter);
app.use('/api/v1/products', routes.deleteOfferRouter);
app.use('/api/v1/products', routes.createCategoryOfferRouter);
app.use('/api/v1/products', routes.removeCategoryOfferRouter);
app.use('/api/v1/products', routes.requestCustomProductRouter);
app.use('/api/v1/products', routes.createCustomProductRouter);
app.use('/api/v1/products', routes.updateCustomProductRouter);
app.use('/api/v1/products', routes.deleteCustomProductRouter);

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
