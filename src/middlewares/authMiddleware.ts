import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send({ message: 'Unauthorized' });
    const user: any = jwt.verify(token, 'secret');
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
};
