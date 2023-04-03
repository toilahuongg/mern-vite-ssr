import { TErrorResponse } from '@server/schema/response.schema';

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
  protected status: number;
  constructor({ message = ReasonStatusCode.INTERNAL_SERVER, status = StatusCode.INTERNAL_SERVER }: TErrorResponse) {
    super(message);
    this.status = status;
  }
}

export class BadRequest extends ErrorResponse {
  constructor(message = ReasonStatusCode.BAD) {
    super({ message, status: StatusCode.BAD });
  }
}

export class ConflictErrorRequest extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT) {
    super({ message, status: StatusCode.CONFLICT });
  }
}
