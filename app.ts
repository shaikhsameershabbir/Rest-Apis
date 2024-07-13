import express, { Response, NextFunction, Request } from 'express';
import { STATUS_CODES } from 'http';
import createHttpError, { HttpError } from 'http-errors';
import { config } from './src/config/config';

const app = express();

app.get('/', (req, res, next) => {
    const error = createHttpError(400, 'Something Went Wrong ')
    throw error 
    res.json({ msg: "AAAgaya bhai" });

});



export default app; 