import 'reflect-metadata';

import express from 'express';

import appointments from './routes/appointments.routes';

import './database/';

const app = express();

app.use(express.json());

app.use(appointments);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server Started => http://localhost:3333!');
});
