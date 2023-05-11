import { DataTypes } from 'sequelize';
import { connection } from '../db';
import { User } from './user.model';

export const Record = connection.define('records', {
  id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
  message: { type: DataTypes.STRING, unique: true, allowNull: false },
  authorId: { type: DataTypes.STRING, allowNull: false },
});
