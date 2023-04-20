import { type Request, type Response } from 'express';
import { userSchema } from '../schemes/user';
import bcrypt from 'bcrypt';
import { db, userQueries } from '../db';
import { sign, verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../constants';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../constants/jwtInfo';
import { type IJWTInfo, type IUser } from '../schemes/user/interfaces';

export class UserController {
  async registration(req: Request, res: Response) {
    try {
      const { email, username, password } = await userSchema.validateAsync(
        req.body
      );

      const hashPassword = await bcrypt.hash(password, 10);

      const user = await db.one(userQueries.create, [
        username,
        email,
        hashPassword,
      ]);

      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ err: (err as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = await userSchema.validateAsync(req.body);

      const user = await db.oneOrNone(userQueries.getByEmail, email);

      const check = await bcrypt.compare(password, user.password);

      if (!check) {
        res.status(400).json({ message: 'Email or password is incorrect :((' });
        return;
      }

      const { id, username } = user;

      const userData = { id, email, username };

      const accessToken = sign(userData, ACCESS_TOKEN_SECRET!, {
        expiresIn: ACCESS_TOKEN_LIFETIME,
      });

      const refreshToken = sign(userData, REFRESH_TOKEN_SECRET!, {
        expiresIn: REFRESH_TOKEN_LIFETIME,
      });

      await db.any(userQueries.updateToken, [refreshToken, id]);

      res.status(200).json({
        accessToken,
        refreshToken,
        username,
        id,
        email,
      });
    } catch (err) {
      res.json({ err: (err as Error).message });
    }
  }

  async refreshToken(req: Request, res: Response) {
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
  }
}

export const userController = new UserController();
