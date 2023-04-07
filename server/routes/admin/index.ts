import * as express from 'express';
import { authentication } from '@server/middlewares/auth.middleware';
import { accessScopes, detechRoles } from '@server/middlewares/role.middleware';
import { SCOPES } from '@server/utils/permissions';

const router = express.Router();
router.use(authentication, detechRoles);

router.post('/admin/check-admin', accessScopes([SCOPES.ACCESS_ADMINISTRATION, SCOPES.READ_ACCOUNTS]), (req, res) => {
  return res.json({ oke: 1 });
});
export default router;
