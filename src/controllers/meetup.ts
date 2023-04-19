import { type Request, type Response } from 'express';
import { meetupSchema, queryObjectSchema } from '../schemes/meetup';
import { meetupService } from '../services/meetup';
import { sendMessage } from '../utils/sendMessage';
import { createSearchQuery } from '../utils/createSearchQuery';
import { type IQuery } from '../schemes/meetup/interfaces';
import { type Result } from '../types';

class MeetupController {
  async getMeetups(req: Request, res: Response) {
    try {
      await queryObjectSchema.validateAsync(req.query);

      let data: Result;

      if (Object.keys(req.query).length === 0) {
        data = await meetupService.getAll();
      } else {
        const query = createSearchQuery(req.query as unknown as IQuery);

        data = await meetupService.getAllWithCustomQuery(query);
      }

      const {
        query: { page, offset },
      } = req;

      sendMessage(data, res, page as string, offset as string);
    } catch (err) {
      res.status(400).json({ err: (err as Error).message });
    }
  }

  async getOneMeetup(req: Request, res: Response) {
    const {
      params: { id },
    } = req;

    const data = await meetupService.getOne(id);

    sendMessage(data, res);
  }

  async deleteMeetup(req: Request, res: Response) {
    const {
      params: { id },
    } = req;

    const data = await meetupService.delete(id);

    sendMessage(data, res);
  }

  async updateMeetup(req: Request, res: Response) {
    try {
      await meetupSchema.validateAsync(req.body);

      const {
        body: { name, description, tags, timestamps },
      } = req;
      const {
        params: { id },
      } = req;

      const params = [name, description, tags, timestamps, id];

      const data = await meetupService.update(params);

      sendMessage(data, res);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  async createMeetup(req: Request, res: Response) {
    try {
      await meetupSchema.validateAsync(req.body);

      const {
        body: { name, description, tags, timestamps },
      } = req;
      const params = [name, description, tags, timestamps];

      const data = await meetupService.create(params);

      sendMessage(data, res);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }
}

export const meetupController = new MeetupController();
