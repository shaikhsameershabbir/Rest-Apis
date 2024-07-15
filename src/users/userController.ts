import { error } from 'console'
import express, { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import userModal from './userModal'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { config } from '../config/config'


// Create user controller 
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    // Data validation 
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required")
        next(error)
    }
    // checking user is available or not int the database
    try {
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
        res.status(201).json({ accessToken: token });
    } catch (error) {
        next(createHttpError(500, 'error while Creating user  '))
    }
}

// User login controller 
const loginUser = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body
    if (!email || !password) {
        return next(createHttpError(400, "All fields are required"))
    }
    try {
        const user = await userModal.findOne({ email });
        if (!user) {
            return next(createHttpError(404, "User  not found "))
        }
        console.log('user');

        const isMatch = await bcrypt.compare(password, user.password)
        console.log('isMatch', isMatch);

        if (!isMatch) {
            return next(createHttpError(400, "Invalid username or password "))
        }
        const token = sign({ sub: user._id }, config.jwtSecret as string, { expiresIn: '7d' });
        res.status(200).json({ accessTokenss: token })

    } catch (error) {
        next(createHttpError(500, 'Error While login '))
    }


}
export { createUser, loginUser }