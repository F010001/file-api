import { User } from '../models/models';
import { UserType } from '../types/models.types';

export const userRepository = {
  async creaUser(newUser: UserType) {
    return User.create(newUser);
  },

  async findUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  },

  async findUserById(id: string) {
    return User.findByPk(id);
  },
};
