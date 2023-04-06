import * as express from 'express';
import accessController from '@server/controllers/access.controller';
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
  '/auth/signup',
  detechDevice,
  asyncHandler(validate(signUpValidator)),
  asyncHandler(accessController.signUp),
);

router.post('/auth/login', detechDevice, asyncHandler(validate(loginValidator)), asyncHandler(accessController.login));

router.use(authentication);
if (!appConfig.app.isProd) {
  router.get('/auth/check-auth', (req, res) => {
    return res.json(req.userId);
  });
}

router.post('/auth/refresh-token', asyncHandler(accessController.refreshToken));

router.put(
  '/auth/change-password',
  asyncHandler(validate(changePasswordValidator)),
  asyncHandler(accessController.changePassword),
);

router.put(
  '/auth/change-information',
  asyncHandler(validate(changeInformationValidator)),
  asyncHandler(accessController.changeInformation),
);

router.post('/auth/logout', asyncHandler(accessController.logout));
export default router;
