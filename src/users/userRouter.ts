import express from "express";
import { deflate } from "zlib";
import { createUser, loginUser } from "./userController";

const userRouter = express.Router()


userRouter.post('/register', createUser)
userRouter.post('/login', loginUser)


export default userRouter