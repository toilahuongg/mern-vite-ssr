import * as express from 'express';
import * as useragent from 'express-useragent';
import accessController from '@server/controllers/access.controller';
import { asyncHandler } from '@server/middlewares';
import validate from '@server/validators';
import { loginValidator, signUpValidator } from '@server/validators/access.validator';
import { authentication } from '@server/middlewares/auth.middleware';
import appConfig from '@server/configs/app.config';

const router = express.Router();

router.post(
  '/user/signup',
  useragent.express(),
  asyncHandler(validate(signUpValidator)),
  asyncHandler(accessController.signUp),
);

router.post(
  '/user/login',
  useragent.express(),
  asyncHandler(validate(loginValidator)),
  asyncHandler(accessController.login),
);

if (!appConfig.app.isProd) {
  router.get('/user/check-auth', authentication, (req, res) => {
    return res.json(req.userId);
  });
}

export default router;
