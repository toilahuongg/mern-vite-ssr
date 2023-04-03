import AccessService from '@server/services/access.service';
import { Request, Response } from 'express';

class AccessController {
  static async signUp(req: Request, res: Response) {
    return res.status(201).json(await AccessService.signUp(req.body));
  }
}

export default AccessController;
