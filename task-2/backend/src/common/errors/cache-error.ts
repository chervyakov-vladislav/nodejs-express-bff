import { CustomError } from './custom-errors';

export class CacheError extends CustomError {
  statusCode = 500;

  constructor(message = 'Cache error') {
    super(message);
    this.message = message;

    Object.setPrototypeOf(this, CacheError.prototype);
  }

  serializeError() {
    return { message: this.message };
  }
}
