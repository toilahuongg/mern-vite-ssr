import * as express from 'express';
import accessController from '@server/controllers/access.controller';
import { asyncHandler } from '@server/middlewares';
import validate from '@server/validators';
import { signUpValidator } from '@server/validators/access.validator';

const router = express.Router();

router.post('/user/signup', asyncHandler(validate(signUpValidator)), asyncHandler(accessController.signUp));

export default router;
