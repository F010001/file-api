import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/authService';

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error('Wrong body');
      }
      const token = await authService.signUp(email, password);
      res.cookie('refreshToken', token.refreshToken, {
        httpOnly: true,
        secure: true,
      });
      res.send({ accessToken: token.accessToken });
    } catch (error) {
      res.send({ message: 'Wrong login or password' });
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error('Wrong body');
      }
      const token = await authService.signIn(email, password);
      res.cookie('refreshToken', token.refreshToken, {
        httpOnly: true,
        secure: true,
      });
      res.send({ accessToken: token.accessToken });
    } catch (error) {
      res.send({ message: 'Wrong login or password' });
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw new Error('Wrong token');
      }
      const token = await authService.refreshToken(refreshToken);
      res.cookie('refreshToken', token.refreshToken, {
        httpOnly: true,
        secure: true,
      });
      res.send(token.accessToken);
    } catch (error) {
      res.send({ message: 'Inccorect token' });
    }
  }

  async info(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const email = await authService.info(id);
      res.send(email);
    } catch (error) {
      res.send(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('refreshToken', { secure: true, httpOnly: true });
      res.send('You are logout');
    } catch (error) {
      res.send(error);
    }
  }
}

export const userController = new UserController();
