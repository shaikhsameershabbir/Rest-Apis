
import express, { NextFunction, Request, Response } from 'express'
import cloudinary from '../config/cloudinary'
import { Multer } from 'multer'
import path from 'node:path'
import { config } from '../config/config'
import createHttpError from 'http-errors'
import bookModal from './bookModal'
import fs from 'node:fs'

// Create user controller 
const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, genre } = req.body
        const files = req.files as { [fielname: string]: Express.Multer.File[]; }
        const coverImageMimetype = files.coverImage[0].mimetype.split('/').at(-1) // splitting by / nad taking last indexx 
        const fileName = files.coverImage[0].filename;
        const filePath = path.resolve(__dirname, '../../data/uploads', fileName)
        const ImageUploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: 'bookCovers',
            format: coverImageMimetype
        })
        const bookPath = path.resolve(__dirname, '../../data/uploads', files.file[0].filename,)
        const bookUploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: 'raw',
            filename_override: files.file[0].filename,
            folder: 'Books',
            format: 'PDF'
        })
        // Saving book data to database 
        const NewBook = await bookModal.create({
            title: title,
            genre: genre,
            author: "6694c19c86a2d9cfaac4fba2",
            coverImage: ImageUploadResult.secure_url,
            file: bookUploadResult.secure_url
        });
        // deleting temp files 
        await fs.promises.unlink(filePath)
        await fs.promises.unlink(bookPath)


        res.status(201).json({ id: NewBook._id })
    } catch (error) {
        next(createHttpError(500, 'Internal server error '))
    }
}

export { createBook }