import { Router } from 'express';
import { meetupController } from '../controllers/meetup';

export const router = Router();

router.get('/meetup', meetupController.getMeetups);

router.get('/meetup/:id', meetupController.getOneMeetup);

router.post('/meetup', meetupController.createMeetup);

router.delete('/meetup/:id', meetupController.deleteMeetup);

router.patch('/meetup/:id', meetupController.updateMeetup);
