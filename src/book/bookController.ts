
import express, { NextFunction, Request, Response } from 'express'



// Create user controller 
const createBook = async (req: Request, res: Response, next: NextFunction) => {
    console.log('http://localhost:4000/api/users/bookshttp://localhost:4000/api/users/books');
    
    res.json({ ok: 'ok ' })
}

export  { createBook }