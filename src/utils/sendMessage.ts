import { type Response } from 'express';
import { type Result } from '../types/index';

export const sendMessage = (data: Result, res: Response) => {
  if (data.err) {
    res.status(data.status).json({ err: data.err, message: data.result });
  }

  res.status(data.status).json(data.result);
};
