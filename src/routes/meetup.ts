import { Router } from 'express';
import { meetupController } from '../controllers/meetup';

export const router = Router();

router.get('/', meetupController.getMeetups);
router.post('/', meetupController.createMeetup);
router.get('/:id', meetupController.getOneMeetup);
router.delete('/:id', meetupController.deleteMeetup);
router.patch('/:id', meetupController.updateMeetup);
