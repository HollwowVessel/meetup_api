import { type NextFunction, type Request, type Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../constants';
import { type IJWTInfo } from '../schemes/user/interfaces';
import { db, meetupQueries } from '../db';
import { FORBIDDEN, NOT_FOUND } from '../constants/httpMessages';

export const checkPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: reqId } = req.params;

    const { creator_id: creatorId } = await db.oneOrNone(meetupQueries.getOne, [
      reqId,
    ]);

    const { accessToken } = req.cookies;

    const { id } = verify(accessToken, ACCESS_TOKEN_SECRET!) as IJWTInfo;

    if (creatorId !== id) {
      res.status(403).json({ err: FORBIDDEN });
      return;
    }

    next();
  } catch (err) {
    res.status(404).json({ err: NOT_FOUND });
  }
};
