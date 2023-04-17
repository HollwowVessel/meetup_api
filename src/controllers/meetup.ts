import { type NextFunction, type Request, type Response } from 'express';
import { db, queries } from '../db';

class MeetupController {
  async getMeetups(req: Request, res: Response, next: NextFunction) {
    try {
      const meetups = await db.many(queries.getAll);

      res.status(200).json(meetups);
    } catch (err) {
      next(err);
    }
  }

  async getOneMeetup(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const meetup = await db.one(queries.getOne, [id]);

      res.status(200).json(meetup);
    } catch (err) {
      next(err);
    }
  }

  async deleteMeetup(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const meetup = await db.one(queries.delete, [id]);

      res.status(200).json({ ...meetup, success: true });
    } catch (err) {
      next(err);
    }
  }

  async updateMeetup(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, tags, timestamps } = req.body;
      const { id } = req.params;

      const params = [name, description, tags, timestamps, id];

      const meetup = await db.one(queries.update, params);

      res.status(200).json(meetup);
    } catch (err) {
      next(err);
    }
  }

  async createMeetup(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, tags, timestamps } = req.body;

      const params = [name, description, tags, timestamps];

      const newMeetup = await db.one(queries.create, params);

      res.status(201).json(newMeetup);
    } catch (err) {
      next(err);
    }
  }
}

export const meetupController = new MeetupController();
