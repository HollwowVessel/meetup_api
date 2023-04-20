import { type Request, type Response } from 'express';
import { loginSchema, userSchema } from '../schemes/user';
import { sign, verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../constants';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../constants/jwtInfo';
import { type IJWTInfo } from '../schemes/user/interfaces';
import { userService } from '../services/user';
import { sendMessage } from '../utils/sendMessage';
import { getMaxAge } from '../utils/getMaxAge';
import { type UserInfo } from '../types';

export class UserController {
  async registration(req: Request, res: Response) {
    try {
      const { email, username, password, role } =
        await userSchema.validateAsync(req.body);

      const data = await userService.registration(
        username,
        email,
        password,
        role
      );

      sendMessage(data, res);
    } catch (err) {
      res.status(400).json({ err: (err as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = await loginSchema.validateAsync(req.body);

      const data = await userService.login(email, password);

      res
        .status(data.status)
        .cookie('accessToken', (data.result as UserInfo).accessToken, {
          maxAge: getMaxAge(ACCESS_TOKEN_LIFETIME),
        })
        .cookie('refreshToken', (data.result as UserInfo).refreshToken, {
          maxAge: getMaxAge(ACCESS_TOKEN_LIFETIME),
        })
        .json(data.result);
    } catch (err) {
      res.json({ err: (err as Error).message });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;

      const { id, email, username, role } = verify(
        refreshToken,
        REFRESH_TOKEN_SECRET!
      ) as IJWTInfo;

      const userData = { id, username, email, role };

      const accessToken = sign(userData, ACCESS_TOKEN_SECRET!, {
        expiresIn: ACCESS_TOKEN_LIFETIME,
      });

      res
        .status(200)
        .cookie('accessToken', accessToken, {
          maxAge: getMaxAge(ACCESS_TOKEN_LIFETIME),
        })
        .cookie('refreshToken', refreshToken, {
          maxAge: getMaxAge(REFRESH_TOKEN_LIFETIME),
        })
        .send({ accessToken, refreshToken });
    } catch (err) {
      res.status(400).json({ err: (err as Error).message });
    }
  }
}

export const userController = new UserController();
