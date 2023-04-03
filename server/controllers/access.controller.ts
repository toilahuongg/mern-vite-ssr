import { CREATED } from '@server/core/success.response';
import AccessService from '@server/services/access.service';
import { Request, Response } from 'express';

class AccessController {
  static async signUp(req: Request, res: Response) {
    new CREATED({
      message: 'Registered OK!',
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  }
}

export default AccessController;
