import * as express from 'express';
import accessController from '@server/controllers/account.controller';
import { detectException } from '@server/middlewares';
import validate from '@server/validators';
import {
  changeInformationValidator,
  changePasswordValidator,
  loginValidator,
  signUpValidator,
} from '@server/validators/access.validator';
import { authentication } from '@server/middlewares/auth.middleware';
import appConfig from '@server/configs/app.config';
import detectDevice from '@server/middlewares/device.middleware';

const router = express.Router();

router.post('/account/signup', detectDevice, validate(signUpValidator), detectException(accessController.signUp));

router.post('/account/login', detectDevice, validate(loginValidator), detectException(accessController.login));

router.use(authentication);
if (!appConfig.app.isProd) {
  router.get('/account/check-auth', (req, res) => {
    return res.json({ id: req.accountId });
  });
}

router.post('/account/refresh-token', detectException(accessController.refreshToken));

router.put(
  '/account/change-password',
  validate(changePasswordValidator),
  detectException(accessController.changePassword),
);

router.put(
  '/account/change-information',
  validate(changeInformationValidator),
  detectException(accessController.changeInformation),
);

router.post('/account/logout', detectException(accessController.logout));
export default router;
