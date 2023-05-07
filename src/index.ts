import express, { Express } from 'express';
import dotenv from 'dotenv';
import { connection } from './db';
import { router } from './routes/router';
dotenv.config();

const app: Express = express();
const port = 8000;

app.use(express.json());
app.use('/api', router);

const start = async () => {
  try {
    await connection.authenticate();
    await connection.sync();
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
