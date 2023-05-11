import { DataTypes, Model } from 'sequelize';
import { connection } from '../db';
import { UserType } from '../types/models.types';
import { RecordModel } from './record.model';

export class UserModel extends Model<UserType> {}

UserModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: 'users',
  }
);

UserModel.hasMany(RecordModel);
