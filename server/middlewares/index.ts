import { NextFunction, Request, Response } from 'express';

type TFn = (req: Request, res: Response, next: NextFunction) => Promise<any>;
export const asyncHandler = (fn: TFn) => {
  return <TFn>((req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  });
};
