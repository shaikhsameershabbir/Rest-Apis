import { error } from 'console'
import express, { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'


// User controller 
const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required")
        next(error)
    }
    

    res.json({ name, email, password })
}

export { createUser }