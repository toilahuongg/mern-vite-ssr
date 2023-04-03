import { BadRequest } from '@server/core/error.response';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    if (result.success) return next();
    console.log(result.error.issues);
    throw new BadRequest(result.error.issues[0].message);
  };
};

export default validate;
