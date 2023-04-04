import * as express from 'express';
import * as useragent from 'express-useragent';
import * as requestIP from 'request-ip';
import { TDevice } from '@server/schema/key.schema';

const detechDevice = express.Router();
detechDevice.use(useragent.express());
detechDevice.use((req, res, next) => {
  const { browser, os } = req.useragent!;
  const ipAddress = requestIP.getClientIp(req)!;

  const device: TDevice = {
    browser,
    os,
    ipAddress,
    refreshToken: '',
  };
  req.device = device;
  next();
});

export default detechDevice;
