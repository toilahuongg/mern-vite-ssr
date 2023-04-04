import * as express from 'express';
import * as useragent from 'express-useragent';
import accessController from '@server/controllers/access.controller';
import { asyncHandler } from '@server/middlewares';
import validate from '@server/validators';
import { loginValidator, signUpValidator } from '@server/validators/access.validator';

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

router.get('/test', useragent.express(), (req, res) => {
  console.log(req.useragent);

  return res.json('oke');
});
export default router;
