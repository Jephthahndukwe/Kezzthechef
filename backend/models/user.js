const mongoose = require('mongoose');
const validator = require('validator'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required: [true, 'Please enter your fullname'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email:{
        type:String,
        required: [true, 'Please enter your email address'],
        unique:true,
        validate: [validator.isEmail, 'Please enter valid email address'],
    },
    mobile:{
        type:String,
        required: [true, 'Please enter your mobile number'],
        unique:true,
        validate: [validator.isMobilePhone, 'Please enter valid mobile number'],
    },
    password:{
        type:String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'Your password must be at least 8 characters'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: 'user',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


// Retrun JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME,
    });
};

//Generate Password reset token
userSchema.methods.getResetPasswordToken = function () {

    //Generate password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set token expire time 
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
};

//Export the model
module.exports = mongoose.model('User', userSchema);