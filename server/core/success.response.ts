/* eslint-disable @typescript-eslint/no-explicit-any */
import { TInputSuccess } from '@server/schema/response.schema';
import { Response } from 'express';

const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  OK: 'Success',
  CREATED: 'Created',
};

export class SuccessResponse<T> {
  protected message: string;
  protected statusCode: number;
  protected metadata: T;
  constructor({ message = ReasonStatusCode.OK, statusCode = StatusCode.OK, metadata }: TInputSuccess<T>) {
    this.message = message;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }

  send(res: Response, headers: { [key: string]: any }[] = []) {
    headers.forEach((header) => {
      const name = Object.keys(header)[0];
      const value = header[name];
      res.setHeader(name, value);
    });
    return res.status(this.statusCode).json(this);
  }
}

export class OK<T> extends SuccessResponse<T> {
  constructor({ message, metadata }: TInputSuccess<T>) {
    super({ message, metadata });
  }
}

export class CREATED<T> extends SuccessResponse<T> {
  constructor({ message = ReasonStatusCode.CREATED, statusCode = StatusCode.CREATED, metadata }: TInputSuccess<T>) {
    super({ message, statusCode, metadata });
  }
}
