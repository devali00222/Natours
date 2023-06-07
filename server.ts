import mongoose from 'mongoose';
import { config } from 'dotenv';
import app from './app';

config({ path: './.env' });
const DB = process.env.db__URI!.replace(
  '<PASSWORD>',
  process.env.db__PASSWORD!
);

mongoose.connect(DB, () => {
  console.log('connected to database');
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(port);
});
