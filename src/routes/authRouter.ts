import { Router } from 'express';
import { userController } from '../controllers/authController';
import { authMiddleWare } from '../middlewares/authMiddleware';

export const authRouter = Router({});

authRouter.post('/signup', userController.signUp);
authRouter.post('/signin', userController.signIn);
authRouter.post('/signin/new_token', userController.refresh);
authRouter.get('/logout', userController.logout);
authRouter.get('/info', authMiddleWare, userController.info);
