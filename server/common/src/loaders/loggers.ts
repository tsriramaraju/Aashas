import { Application } from 'express';
import morgan from 'morgan';

export const loggers = (app: Application): void => {
  /**
   * Logs every request made to server
   */
  app.use(
    morgan(':method :url :status :response-time ms - :res[content-length]')
  );
};
