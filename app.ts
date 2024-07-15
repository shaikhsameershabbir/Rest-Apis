import express, { Response, NextFunction, Request } from 'express';
import { STATUS_CODES } from 'http';
import createHttpError, { HttpError } from 'http-errors';
import { config } from './src/config/config';
import userRouter from './src/users/userRouter';
import bookRouter from './src/book/bookRouter';

const app = express();

app.get('/', (req, res, next) => {
    res.json({ msg: "AAAgaya bhai" });
});
app.use(express.json())
app.use('/api/users/', userRouter)
app.use('/api/books/', bookRouter)



export default app; 