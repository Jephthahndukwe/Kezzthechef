const Product = require('../models/product');
const dotenv = require('dotenv').config({ path: 'backend/config/config.env' })
const dbConnect = require('../config/dbconnect');

const product = require('../data/products');
const { connect } = require('mongoose');


dbConnect();

const sendProduct = async () => {
    try {
        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(product)
        console.log('All Products Are Added.')

        process.exit();
    }
    catch(error) {
        console.log(error.message);
        process.exit();
    }
}

sendProduct();