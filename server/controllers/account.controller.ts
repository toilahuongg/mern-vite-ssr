import { Request, Response } from 'express';
import { CREATED, OK } from '@server/core/success.response';
import AccountService from '@server/services/account.service';

class AccessController {
  static async signUp(req: Request, res: Response) {
    new CREATED({
      message: 'Registered OK!',
      metadata: await AccountService.signUp(req.body, req.device!),
    }).send(res);
  }

  static async login(req: Request, res: Response) {
    new OK({
      message: 'Login success!',
      metadata: await AccountService.login(req.body, req.device!),
    }).send(res);
  }

  static async logout(req: Request, res: Response) {
    new OK({
      message: 'Logout success!',
      metadata: await AccountService.logout(req.accountId!, req.deviceId!),
    }).send(res);
  }

  static async refreshToken(req: Request, res: Response) {
    new OK({
      message: 'Get accessToken success!',
      metadata: await AccountService.refreshToken({
        refreshToken: req.refreshToken!,
        deviceId: req.deviceId!,
      }),
    }).send(res);
  }

  static async changePassword(req: Request, res: Response) {
    new OK({
      message: 'Change password success!',
      metadata: await AccountService.changePassword(req.accountId!, req.body),
    }).send(res);
  }

  static async changeInformation(req: Request, res: Response) {
    new OK({
      message: 'Change information success!',
      metadata: await AccountService.changeInformation(req.accountId!, req.body),
    }).send(res);
  }
}

export default AccessController;
