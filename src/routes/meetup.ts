import { Router } from 'express';
import { meetupController } from '../controllers/meetup';
import { checkPermission } from '../middlewares/checkPermission';

export const router = Router();

router.get('/', meetupController.getMeetups);
router.post('/', checkPermission, meetupController.createMeetup);
router.get('/:id', meetupController.getOneMeetup);
router.delete('/:id', checkPermission, meetupController.deleteMeetup);
router.patch('/:id', checkPermission, meetupController.updateMeetup);
