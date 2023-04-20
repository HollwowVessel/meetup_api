import { type Request, type Response } from 'express';
import { userSchema } from '../schemes/user';
import { sign, verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../constants';
import { ACCESS_TOKEN_LIFETIME } from '../constants/jwtInfo';
import { type IJWTInfo } from '../schemes/user/interfaces';
import { userService } from '../services/user';
import { sendMessage } from '../utils/sendMessage';

export class UserController {
  async registration(req: Request, res: Response) {
    try {
      const { email, username, password } = await userSchema.validateAsync(
        req.body
      );

      const data = await userService.registration(username, email, password);

      sendMessage(data, res);
    } catch (err) {
      res.status(400).json({ err: (err as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = await userSchema.validateAsync(req.body);

      const data = await userService.login(email, password);

      sendMessage(data, res);
    } catch (err) {
      res.json({ err: (err as Error).message });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      const { id, email, username } = verify(
        refreshToken,
        REFRESH_TOKEN_SECRET!
      ) as IJWTInfo;

      const userData = { id, username, email };

      const accessToken = sign(userData, ACCESS_TOKEN_SECRET!, {
        expiresIn: ACCESS_TOKEN_LIFETIME,
      });

      res.status(200).send({ refreshToken, accessToken });
    } catch (err) {
      res.status(400).json({ err: (err as Error).message });
    }
  }
}

export const userController = new UserController();
