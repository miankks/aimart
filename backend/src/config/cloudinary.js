import {v2 as cloudinary} from 'cloudinary';
import { ENV } from './env';

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_URL,
    api_key: ENV.API_KEY,
    api_secret: ENV.API_SECRET
})

export default cloudinary;