import { CustomError } from './customError';

export class DatabaseConnectionError extends CustomError {
  statusCode = 520;
  reason = 'Error connecting to database, Please try again later';

  constructor(public msg?: string) {
    super(msg ? msg : 'Error connecting to db');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return { msg: this.msg || this.reason };
  }
}
