import { DataTypes, Model } from 'sequelize';
import { connection } from '../db';
import { RecordType } from '../types/models.types';
import { User } from './user.model';

export const Record = connection.define('records', {
  id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
  message: { type: DataTypes.STRING, unique: true, allowNull: false },
  authorId: { type: DataTypes.STRING, allowNull: false },
});

Record.hasOne(User);
