const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv').config({ path: 'backend/config/config.env' });
const path = require('path')


const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());



// Import all the routes
const product = require('./routes/product')
const user = require('./routes/user')
const order = require('./routes/order')
const payment = require('./routes/payment')



app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)

if(process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


//Middleware to Handle errors
app.use(errorMiddleware);

module.exports = app