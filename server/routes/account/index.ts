import * as express from 'express';
import accessController from '@server/controllers/account.controller';
import { asyncHandler } from '@server/middlewares';
import validate from '@server/validators';
import {
  changeInformationValidator,
  changePasswordValidator,
  loginValidator,
  signUpValidator,
} from '@server/validators/access.validator';
import { authentication } from '@server/middlewares/auth.middleware';
import appConfig from '@server/configs/app.config';
import detechDevice from '@server/middlewares/device.middleware';

const router = express.Router();

router.post(
  '/account/signup',
  detechDevice,
  asyncHandler(validate(signUpValidator)),
  asyncHandler(accessController.signUp),
);

router.post(
  '/account/login',
  detechDevice,
  asyncHandler(validate(loginValidator)),
  asyncHandler(accessController.login),
);

router.use(authentication);
if (!appConfig.app.isProd) {
  router.get('/account/check-auth', (req, res) => {
    return res.json(req.userId);
  });
}

router.post('/account/refresh-token', asyncHandler(accessController.refreshToken));

router.put(
  '/account/change-password',
  asyncHandler(validate(changePasswordValidator)),
  asyncHandler(accessController.changePassword),
);

router.put(
  '/account/change-information',
  asyncHandler(validate(changeInformationValidator)),
  asyncHandler(accessController.changeInformation),
);

router.post('/account/logout', asyncHandler(accessController.logout));
export default router;
