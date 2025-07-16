import { CustomError } from './custom-errors';

export class ConflictError extends CustomError {
  statusCode = 409;

  constructor(message: string) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, ConflictError.prototype);
  }

  serializeError() {
    return { message: this.message };
  }
}
