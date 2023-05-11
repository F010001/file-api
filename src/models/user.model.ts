import { DataTypes, Model } from 'sequelize';
import { connection } from '../db';
import { Record } from './record.model';

export const User = connection.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Record);
