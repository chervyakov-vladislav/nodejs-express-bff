import { CustomError } from './custom-errors';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(message = 'Requires authentication') {
    super(message);
    this.message = message;

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeError() {
    return { message: this.message };
  }
}
