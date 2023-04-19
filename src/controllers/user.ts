import { type Request, type Response } from 'express';
import { userSchema } from '../schemes/user';
import bcrypt from 'bcrypt';
import { db, userQueries } from '../db';
import { sign } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../constants';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../constants/jwtInfo';

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
      const { email, username, password } = await userSchema.validateAsync(
        req.body
      );

      const user = await db.oneOrNone(userQueries.getByEmail, email);

      const check = await bcrypt.compare(password, user.password);

      if (!check) {
        res.status(400).json({ message: 'Email or password is incorrect :((' });
        return;
      }

      const { id, name } = user;
      const userData = { id, email, name };

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
}

export const userController = new UserController();
