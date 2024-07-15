import express, { NextFunction, Request, Response } from 'express'



const createUser = async (req: Request, res: Response, next: NextFunction) => {
    res.json('Alhamdulillaah ')
}

export { createUser }