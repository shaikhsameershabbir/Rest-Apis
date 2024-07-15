import { error } from 'console'
import express, { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import userModal from './userModal'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { config } from '../config/config'


// User controller 
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    // Data validation 
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required")
        next(error)
    }
    // checking user is available or not int the database 
    const user = await userModal.findOne({ email })
    if (user) {
        const error = createHttpError(400, "User Already exist with this username ")
    }
    // hashing password 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModal.create({
        name, email, password: hashedPassword
    })
    // JWT token generation 
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, { expiresIn: '7d' });
    

    res.json({ accessToken: token });
}

export { createUser }