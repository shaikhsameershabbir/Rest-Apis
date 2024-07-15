import express from "express";
import { deflate } from "zlib";
import { createUser } from "./userController";

const userRouter = express.Router()


userRouter.post('/register', createUser)


export default userRouter