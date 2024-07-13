import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export const globalErrorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        message: err.message,
        errorStack: process.env.NODE_ENV === 'development' ? err.stack : ''
    });
};
