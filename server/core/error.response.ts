import { TInputError } from '@server/schema/response.schema';

const StatusCode = {
  BAD: 400,
  FORBIDDEN: 403,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER: 500,
};

const ReasonStatusCode = {
  BAD: 'Bad request error',
  FORBIDDEN: 'You do not have permission to access this page!',
  CONFLICT: 'Conflict error',
  UNAUTHORIZED: 'Unauthenrized error',
  INTERNAL_SERVER: 'Internal server error',
};
export default class ErrorResponse extends Error {
  protected statusCode: number;
  constructor({ message = ReasonStatusCode.INTERNAL_SERVER, statusCode = StatusCode.INTERNAL_SERVER }: TInputError) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequest extends ErrorResponse {
  constructor(message = ReasonStatusCode.BAD) {
    super({ message, statusCode: StatusCode.BAD });
  }
}

export class ConflictErrorRequest extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT) {
    super({ message, statusCode: StatusCode.CONFLICT });
  }
}
