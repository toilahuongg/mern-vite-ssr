import * as express from 'express';
import accessController from '@server/controllers/access.controller';
import { asyncHandler } from '@server/middlewares';
import validate from '@server/validators';
import { loginValidator, signUpValidator } from '@server/validators/access.validator';
import { authentication } from '@server/middlewares/auth.middleware';
import appConfig from '@server/configs/app.config';
import detechDevice from '@server/middlewares/device.middleware';

const router = express.Router();

router.post(
  '/user/signup',
  detechDevice,
  asyncHandler(validate(signUpValidator)),
  asyncHandler(accessController.signUp),
);

router.post('/user/login', detechDevice, asyncHandler(validate(loginValidator)), asyncHandler(accessController.login));

router.use(authentication);
if (!appConfig.app.isProd) {
  router.get('/user/check-auth', (req, res) => {
    return res.json(req.userId);
  });
}

router.post('/user/logout', asyncHandler(accessController.logout));
export default router;
