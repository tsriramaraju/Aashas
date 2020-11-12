export abstract class CustomError extends Error {
  abstract readonly statusCode: number;

  constructor(message: string | undefined) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    msg: string;
    errors?: { message: string; field: string }[];
  };
}
