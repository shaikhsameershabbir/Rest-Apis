/**
 * to import all the env credentials and freeze them to avoid 
 * overriding and to prevent code from writing process.env again and again 
 */

import { config as conf } from "dotenv"
conf()
const _config = {
    port: process.env.port,
    databaseUrl: process.env.MONGO_CONNECTION_STRING,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    cloudinaryCloudName: process.env.CLOUDINARY_cLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinarySecretKey: process.env.CLOUDINARY_API_SECRET,
};
export const config = Object.freeze(_config)