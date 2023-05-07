import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository';

export class AuthService {
  async signUp(email: string, password: string) {
    const oldUser = await userRepository.findUserByEmail(email);
    if (oldUser) {
      throw new Error('Usser is already is exist');
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await userRepository.creaUser({
      id: uuidv4(),
      email: email,
      password: passwordHash,
    });
    return this.generateToken(newUser.dataValues.id);
  }

  async signIn(password: string, email: string) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const equalPassword = await bcrypt.compare(
      password,
      user.dataValues.password
    );
    if (!equalPassword) {
      throw new Error('Wrong password');
    }
    return this.generateToken(user.dataValues.id);
  }

  async refreshToken(refreshToken: string) {
    const user: any = jwt.verify(refreshToken, 'secret');
    if (!user) {
      throw new Error('Token not valid');
    }
    return this.generateToken(user.id);
  }

  async info(id: string) {
    const user = await userRepository.findUserById(id);
    if (!user) {
      throw new Error('Token not valid');
    }
    return user.dataValues.email;
  }

  private async generateToken(id: string) {
    const payload = { id };
    return {
      accessToken: jwt.sign(payload, 'secret', {
        expiresIn: '10m',
      }),
      refreshToken: jwt.sign(payload, 'secret', {
        expiresIn: '24h',
      }),
    };
  }
}

export const authService = new AuthService();
