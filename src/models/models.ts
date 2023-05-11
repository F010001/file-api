import { DataTypes } from 'sequelize';
import { connection } from '../db';

export const User = connection.define('users', {
  id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

export const Record = connection.define('records', {
  id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
  message: { type: DataTypes.STRING, unique: true, allowNull: false },
  authorId: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Record, { as: 'records' });
Record.belongsTo(User, {
  foreignKey: 'authorId',
  as: 'user',
});
