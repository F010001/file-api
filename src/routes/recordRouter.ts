import { Router } from 'express';
import { recordController } from '../controllers/recordController';
import { multerMiddleware } from '../middlewares/multerMiddleware';
import { authMiddleWare } from '../middlewares/authMiddleware';

export const recordRouter = Router({});

recordRouter.post(
  '/create-record',
  authMiddleWare,
  multerMiddleware.single('file'),
  recordController.createRecord
);
recordRouter.get('/list', authMiddleWare, recordController.getListRecords);
recordRouter.delete(
  '/delete/:id',
  authMiddleWare,
  recordController.deleteRecord
);
recordRouter.put(
  '/update/:id',
  authMiddleWare,
  multerMiddleware.single('file'),
  recordController.updateRecord
);
