import express from 'express';
import { json } from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import httpContext from 'express-http-context';

import './config/mongoose';

import RootRouter from './routes';

const app = express();

app.use(helmet());

app.use(cors());

app.use(httpContext.middleware);

app.use(express.static('public/images'));

app.use(json());
app.use(morgan('tiny'));
app.use('/api/v1', RootRouter);

const http = require('http').Server(app);

http.listen(8080, () => {
  console.log('server is listening on port 8080');
});

const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8000',
  },
});
socketIO.on('connection', (socket: any) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});
