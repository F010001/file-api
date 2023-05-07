import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const connection = new Sequelize(
  `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}?sslmode=verify-full`
);
