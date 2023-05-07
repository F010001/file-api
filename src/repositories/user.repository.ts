import { UserModel } from '../models/user.model';
import { UserType } from '../types/models.types';

export const userRepository = {
  async creaUser(newUser: UserType) {
    return UserModel.create(newUser);
  },

  async findUserByEmail(email: string) {
    return UserModel.findOne({ where: { email } });
  },

  async findUserById(id: string) {
    return UserModel.findByPk(id);
  },
};
