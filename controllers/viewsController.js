const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
exports.getOverview = catchAsync(async (req, res) => {
    // 1) get tour data from collection

    const tours = await Tour.find();
    // 2) build template

    res.status(200).render('overview', {
        title: 'All tours',
        tours,
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: 'reviews',
        fields: 'review rating user',
    });
    if (!tour) {
        return next(new AppError('There is no tour with that name', 404));
    }
    res.status(200).render('tour', {
        title: `${tour.name} tour`,
        tour,
    });
});

exports.getLoginForm = async (req, res) => {
    if (req.cookies.jwt) {
        const tours = await Tour.find();
        res.status(200).render('overview', {
            title: 'All tours',
            tours,
        });
    } else {
        res.status(200).render('login', {
            title: 'Login into your account',
        });
    }
};

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
        title: 'Your account',
    });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
            name: req.body.name,
            email: req.body.email,
        },
        {
            new: true,
            runValidators: true,
        }
    );
    res.status(200).render('account', {
        title: 'Your account',
        user: updatedUser,
    });
});
