import { userType } from "../users/userTypes";

export interface Book {
    _id: string;
    title: string;
    author: userType;
    genre: string;
    coverImage: string;
    file: string;
    createdAt: Date;
    updatedAt: Date
}