const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary')


//Register User  => /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 400,
        height: 450,
        quality: 100,
        crop: "scale"
    })

   const { fullname, email, mobile, password } = req.body;
   
   const user = await User.create({
    fullname,
    email,
    mobile,
    password,
    avatar: {
        public_id: result.public_id,
        url: result.secure_url,
    }
   })

   sendToken(user, 200, res)

;});

//Login user => /api/v1/login
exports.loginUser = catchAsyncError( async (req, res, next) => {
    const { email, password } = req.body;

    //Checks if email and password is entered by user
    if(!email || !password) {
        return next(new ErrorHandler('Please enter your email & password', 400))
    }

    //Finding user in database
    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    //check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    sendToken(user, 200, res)
    
})

//forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    //Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process:\n\n ${resetUrl}\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`

        try {
            await sendEmail({
                email: user.email,
                subject: 'kezzthechef Password Recovery',
                message
            })

            res.status(200).json({
                status:'success',
                message: `An email has been sent to ${user.email} with further instructions.`
            })
        }
        catch(error) {
           user.resetPasswordToken = undefined;
           user.resetPasswordExpire = undefined;

           await user.save({ validateBeforeSave: false });

           return next(new ErrorHandler(error.message, 500))
        }
})

//reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    
    // Hash the url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if(!user) {
        return next(new ErrorHandler('Passsword reset code has expired', 400))
    }
    
    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Passwords do not match', 400))
    }

    //set up new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
})


// Get currently logged in use  => /api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Update / Change password => /api/v1/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    // Check previouse user password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if(!isMatched) {
        return next(new ErrorHandler('Old password is incorrect', 401))
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);

})


// Update user profile => /api/v1/me/update
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        fullname: req.body.fullname,
        email: req.body.email,
        mobile: req.body.mobile
    }

    // update avatar: T0DO
    if(req.body.avatar !== '') {
        const user = await User.findById(req.user.id)

        const image_id = user.avatar.public_id;

        const res = await cloudinary.v2.uploader.destroy(image_id)

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        user
    })
})

//Logout User => /api/v1/logout
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        status:'success',
        message: 'Logged Out',
    })
})



////// ADMIN ROUTES


//Get all user  => /api/v1/admin/users
exports.allUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})


//Get user details => /api/v1/admin/users/:id
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    })
})

// Update user profile => /api/v1/admin/user/:id
exports.adminUpdateUserProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        fullname: req.body.fullname,
        email: req.body.email,
        mobile: req.body.mobile,
        role: req.body.role
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        user
    })
})

// Delete user => /api/v1/admin/users/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`))
    }

    //Remove avatar from cloudinary
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id)


    // await user.remove();

    res.status(200).json({
        success: true,
        message: 'User has been deleted'
    })
})