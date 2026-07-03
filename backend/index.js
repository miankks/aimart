import express from 'express';
import { ENV } from './src/config/env.js';
import { connectDB } from './src/config/db.js';

const app = express()

app.listen(ENV.PORT, () => {
    connectDB()
    console.log('Server started at', ENV.PORT);
    
})