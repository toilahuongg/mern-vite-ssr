import * as express from 'express';
import accessRouter from './access';
import { TInputError } from '@server/schema/response.schema';
import ErrorResponse from '@server/core/error.response';
const router = express.Router();

router.use('/api/v1', accessRouter);
router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error = new ErrorResponse({ message: 'Not found', statusCode: 404 });
  next(error);
});
router.use((error: TInputError, req: express.Request, res: express.Response, _: express.NextFunction) => {
  const { statusCode, message } = error;
  const code = statusCode || 500;
  const errorMessage = message || 'Internal Server Error';
  return res.status(code).json({
    status: 'error',
    statusCode: code,
    message: errorMessage,
  });
});

export default router;
