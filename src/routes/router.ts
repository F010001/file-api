import { Router } from 'express';
import { authRouter } from './authRouter';
import { recordRouter } from './recordRouter';

export const router = Router({});

router.use('/auth', authRouter);
router.use('/record', recordRouter);
