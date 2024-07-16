
import { v2 as cloudinary } from 'cloudinary';
import { config } from './config';

// Configuration
cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinarySecretKey // Click 'View Credentials' below to copy your API secret
});


export default cloudinary