import { sign } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../constants';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/httpMessages';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../constants/jwtInfo';
import { db, userQueries } from '../db';
import { type Result } from '../types';
import bcrypt from 'bcrypt';

class UserService {
  async registration(
    username: string,
    email: string,
    password: string,
    role = 'user'
  ): Promise<Result> {
    try {
      const hashPassword = await bcrypt.hash(password, 10);

      const user = await db.one(userQueries.create, [
        username,
        email,
        hashPassword,
        role,
      ]);

      return {
        result: user,
        status: 201,
      };
    } catch (err) {
      return { status: 500, err: true, result: INTERNAL_SERVER_ERROR };
    }
  }

  async login(email: string, password: string): Promise<Result> {
    try {
      const user = await db.oneOrNone(userQueries.getByEmail, email);

      const check = await bcrypt.compare(password, user.password);

      if (!check) {
        return {
          result: 'Email or password is incorrect',
          status: 400,
          err: true,
        };
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

      const data = {
        accessToken,
        refreshToken,
        username,
        id,
        email,
      };

      return {
        status: 200,
        result: data,
      };
    } catch (err) {
      return {
        status: 404,
        err: true,
        result: NOT_FOUND,
      };
    }
  }
}

export const userService = new UserService();
