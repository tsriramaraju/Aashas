import { Application } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';

const security = (app: Application): void => {
  /**
   * Sanitizes user inputs
   */
  app.use(mongoSanitize());
  /**
   * Sets security headers
   */
  app.use(helmet());
  /**
   * Prevents  XSS attacks
   */
  app.use(xss());
  /**
   * Prevents http param pollution
   */
  app.use(hpp());
  /**
   * Enables cors
   */
  app.use(cors());
};

export { security };
