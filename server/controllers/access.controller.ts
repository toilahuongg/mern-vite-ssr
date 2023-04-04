import { Request, Response } from 'express';
import * as requestIP from 'request-ip';
import * as hash from 'object-hash';
import { CREATED, OK } from '@server/core/success.response';
import AccessService from '@server/services/access.service';
import { TDevice } from '@server/schema/key.schema';

class AccessController {
  static async signUp(req: Request, res: Response) {
    const { browser, os } = req.useragent!;
    const ipAddress = requestIP.getClientIp(req)!;

    const device: TDevice = {
      browser,
      os,
      ipAddress,
      hash: hash({ browser, os, ipAddress }),
      refreshToken: '',
    };

    new CREATED({
      message: 'Registered OK!',
      metadata: await AccessService.signUp(req.body, device),
    }).send(res);
  }

  static async login(req: Request, res: Response) {
    const { browser, os } = req.useragent!;
    const ipAddress = requestIP.getClientIp(req)!;

    const device: TDevice = {
      browser,
      os,
      ipAddress,
      hash: hash({ browser, os, ipAddress }),
      refreshToken: '',
    };

    new OK({
      message: 'Login successfully!',
      metadata: await AccessService.login(req.body, device),
    }).send(res);
  }
}

export default AccessController;
