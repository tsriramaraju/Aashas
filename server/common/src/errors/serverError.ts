import { CustomError } from './customError';

export class ServerError extends CustomError {
  statusCode = 500;

  constructor(public error: Error) {
    super(error.message);

    Object.setPrototypeOf(this, ServerError.prototype);
  }

  serializeErrors() {
    console.log(this.error);
    return { msg: this.error.message };
  }
}
