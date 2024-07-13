/**
 * to import all the env credentials and freeze them to avoid 
 * overriding and to prevent code from writing process.env again and again 
 */

import { config as conf } from "dotenv"
conf()
const _config = {
    port: process.env.port
};
export const config = Object.freeze(_config)