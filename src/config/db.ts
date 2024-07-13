import mongoose from 'mongoose';
import { config } from './config';

export const dbConnect = async () => {

    try {

        mongoose.connection.on('connected', () => {
            console.log('connected Successfully ');
        })
        mongoose.connection.on('error', (error) => {
            console.log('Error while connecting in database ', error);

        })
        await mongoose.connect(config.databaseUrl as string)
    } catch (error) {
        console.log('Error while Database Connection', error);
        console.log('exiting.............');

        process.exit(1)
    }
}

