import * as express from 'express';
import accessRouter from './access';
import { TErrorResponse } from '@server/schema/response.schema';
import ErrorResponse from '@server/core/error.response';
const router = express.Router();

router.use('/api/v1', accessRouter);
router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error = new ErrorResponse({ message: 'Not found', status: 404 });
  next(error);
});
router.use((error: TErrorResponse, req: express.Request, res: express.Response, _: express.NextFunction) => {
  const { status, message } = error;
  const statusCode = status || 500;
  const errorMessage = message || 'Internal Server Error';
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: errorMessage,
  });
});

export default router;
