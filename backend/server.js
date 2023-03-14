const app = require('./app')
const dbConnect = require('./config/DbConnect')
const dotenv = require('dotenv').config({ path: 'backend/config/config.env' });
const cloudinary = require('cloudinary')

// Handle the Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to unCaught exceptions');
    process.exit(1);
})

//Connecting to Database
dbConnect();

// Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETS
})


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle UnHandle Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1);
    })
})