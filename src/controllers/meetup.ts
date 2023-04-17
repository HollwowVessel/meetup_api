import { type Request, type Response } from 'express';
import { meetupSchema } from '../schemes/meetup';
import { meetupService } from '../services/meetup';
import { sendMessage } from '../utils/sendMessage';

class MeetupController {
  async getMeetups(req: Request, res: Response) {
    const data = await meetupService.getAll();

    sendMessage(data, res);
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
    const { error } = await meetupSchema.validateAsync(req.body);

    if (error) {
      res.status(400).json({ error: error.details });
    }

    const {
      body: { name, description, tags, timestamps },
    } = req;
    const {
      params: { id },
    } = req;

    const params = [name, description, tags, timestamps, id];

    const data = await meetupService.update(params);

    sendMessage(data, res);
  }

  async createMeetup(req: Request, res: Response) {
    const { error } = await meetupSchema.validateAsync(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    }

    const {
      body: { name, description, tags, timestamps },
    } = req;
    const params = [name, description, tags, timestamps];
    const data = await meetupService.create(params);

    sendMessage(data, res);
  }
}

export const meetupController = new MeetupController();
