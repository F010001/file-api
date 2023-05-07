import { DataTypes, Model } from 'sequelize';
import { connection } from '../db';
import { RecordType } from '../types/models.types';

export class RecordModel extends Model<RecordType> {}

RecordModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: 'records',
  }
);
