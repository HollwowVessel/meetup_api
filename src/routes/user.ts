import express from 'express';
import { userController } from '../controllers/user';

export const router = express.Router();

router.post('/login', userController.login);
router.post('/registration', userController.registration);
router.get('/refresh', userController.refreshToken);
