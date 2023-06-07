import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { globalErrorHandling } from './middlewares/handlingErrors';
import toursRoute from './routes/toursRoute';
import userRoute from './routes/userRoute';
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/tours', toursRoute);
app.use('/api/v1/users', userRoute);
app.use(globalErrorHandling);

export default app;
