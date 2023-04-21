import { Router } from 'express';
import { meetupController } from '../controllers/meetup';
import { checkPermission } from '../middlewares/checkPermission';
import { checkDtoFit } from '../middlewares/checkDtoFit';
import { meetupSchema } from '../schemes/meetup';
import { queryObjectSchema } from '../schemes/query';

export const router = Router();

router.get('/', checkDtoFit(queryObjectSchema), meetupController.getMeetups);
router.post(
  '/',
  [checkDtoFit(meetupSchema), checkPermission('creator')],
  meetupController.createMeetup
);
router.get('/:id', meetupController.getOneMeetup);
router.delete(
  '/:id',
  checkPermission('creator'),
  meetupController.deleteMeetup
);
router.patch(
  '/:id',
  [checkDtoFit(meetupSchema), checkPermission('creator')],
  meetupController.updateMeetup
);
