const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/Users');
const asyncHandler = require('../middleware/async');


// @desc    Get All Users
// @route   GET /api/v1/users/
// @access  Private
const getUsers = asyncHandler(async(req, res, next) => {

    const { page, limit } = req.query;

    let query = {};
    let options = {
        select: '',
        sort: { date: -1 },
        populate: '',
        lean: false,
        page: parseInt(Number(page) < 0 ? 0 : Number(page), 10) || 1,
        limit: parseInt(Number(limit) <= 0 ? 1 : Number(limit), 10) || 10,
    };

    User.paginate(query, options).then(function(result) {
        let data = result.docs;
        delete result.docs;
        let pagination = {
            data: data,
            ...result
        }
        res.status(200).json({
            success: true,
            ...pagination,
        })
    });

});


// @desc    Get Single Users 
// @route   GET /api/v1/users/:id
// @access  Private
const getUser = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: user
    })
});


// @desc    Create Users
// @route   POST /api/v1/users/
// @access  Private
const createUser = asyncHandler(async(req, res, next) => {
    const user = await User.create(req.body)

    res.status(201).json({
        success: true,
        data: user
    })
});

// @desc      Update Users
// @route     PUT /api/v1/users/:id
// @access    Private
const updateUser = asyncHandler(async(req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: user
    });
});


// @desc      Delete Users
// @route     DELETE /api/v1/users/:id
// @access    Private
const deleteUser = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});



module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}