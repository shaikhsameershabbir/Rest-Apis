
import express, { NextFunction, Request, Response } from 'express'
import cloudinary from '../config/cloudinary'
import { Multer } from 'multer'
import path from 'node:path'
import { config } from '../config/config'
import createHttpError from 'http-errors'


// Create user controller 
const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
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

        const BookUploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: 'raw',
            filename_override: files.file[0].filename,
            folder: 'Books',
            format: 'PDF'
        })

        console.log(BookUploadResult);


        res.json({ ok: BookUploadResult })
    } catch (error) {
        next(createHttpError(500, 'Internal server error '))

    }
}

export { createBook }