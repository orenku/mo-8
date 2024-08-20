import express from 'express';
import usersRouter from './routes/users.js';
import rateLimit from './middlewares/rate-limit.js';

const usersApp = express();

// Middleware
usersApp.use(express.json());
usersApp.use(rateLimit);

// Routes
usersApp.use('/api/v1', usersRouter);

export default usersApp;