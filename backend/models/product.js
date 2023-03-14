const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter product name'],
        trim: true,
        maxLength: [100, 'product name can not exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'please enter product price'],
        trim: true,
        maxLength: [5, 'product name can not exceed 100 characters'],
        default: 0.0,
    },
    description: {
        type: String,
        required: [true, 'please enter product description'],
    },
    ratings: {
        type: Number,
        defalut: 0,
    },
    images: [
        
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'please select category for this product'],
        enum: {
            values: [
                'Cakes',
                'Cookies',
                'Food',
                'Small Chops',
                'Cocktails',
                'Pastries',
                'Deserts'
            ],
            message: 'please select valid category for product',
        }
    },
    seller: {
        type: String,
        required: [true, 'please enter product seller'],
    },
    stock: {
        type: Number,
        required: [true, 'please enter product stock'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        defalut: 0,
    },
    numOfReviews: {
        type: Number,
        defalut: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'user',
                required: true,
            },
            fullname: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model('product', productSchema)