const ErrorResponse = require('../utils/errorResponse');
const PostcodesIO = require('postcodesio-client');
const Appointment = require('../models/Appointments');
const asyncHandler = require('../middleware/async');
const { distanceMatrix } = require('../utils/distanceMatrix');
const postcodes = new PostcodesIO();

// @desc    Get All Appointment
// @route   GET /api/v1/appointment/
// @access  Private
const getAppointments = asyncHandler(async(req, res, next) => {
    let query = {};
    let options = {};

    const { page, limit } = req.query;

    options = {
        select: '',
        sort: { date: -1 },
        populate: ['user'],
        lean: false,
        page: parseInt(Number(page) < 0 ? 0 : Number(page), 10) || 1,
        limit: parseInt(Number(limit) <= 0 ? 1 : Number(limit), 10) || 10
    };

    Appointment.paginate(query, options).then(function(result) {
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

// @desc    Get User All Appointment
// @route   GET /api/v1/appointment/:userId/user
// @access  Private
const getAppointmentUser = asyncHandler(async(req, res, next) => {
    const { page, limit } = req.query;

    let query = { user: req.params.userId };
    console.log(query)
    let options = {
        select: '',
        sort: { date: -1 },
        lean: false,
        page: parseInt(Number(page) < 0 ? 0 : Number(page), 10) || 1,
        limit: parseInt(Number(limit) <= 0 ? 1 : Number(limit), 10) || 10
    };

    Appointment.paginate(query, options).then(function(result) {
        let data = result.docs;
        delete result.docs;
        let pagination = {
            data,
            ...result
        }
        res.status(200).json({
            success: true,
            ...pagination,
        })
    });

});

// @desc    Get Single Appointment 
// @route   GET /api/v1/appointment/:id
// @access  Private
const getAppointment = asyncHandler(async(req, res, next) => {

    const appointment = await Appointment.findById(req.params.id).populate('user')

    if (!appointment) {
        return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: appointment
    })
});


// @desc    Create Appointment
// @route   GET /api/v1/appointment/
// @access  Private
const createAppointment = asyncHandler(async(req, res, next) => {

    //Getting Real Estate and Appointment Post codes
    let appointmentAddress = req.body.appointment.appointmentAddress;
    let realEstateAddress = req.body.appointment.realEstateAddress;

    //Verification of post codes is in progress.
    let isPostCodeAppointment = await postcodes.validate(appointmentAddress);
    let isPostCodeRealEstate = await postcodes.validate(realEstateAddress);

    //error message for unverifiable post codes
    if (!isPostCodeAppointment) {
        return next(new ErrorResponse(`Address Post Code not found with id of ${isPostCodeAppointment}`, 404));
    }

    if (!isPostCodeRealEstate) {
        return next(new ErrorResponse(`Real Estate Post Code not found with id of ${isPostCodeRealEstate}`, 404));
    }

    //get location information of post codes
    let appointmentAddressCordinates = await postcodes.lookup(appointmentAddress).then(function(postcode) {
        return {
            longitude: postcode.longitude,
            latitude: postcode.latitude,
        }
    });

    let realEstateAddressCordinates = await postcodes.lookup(realEstateAddress).then(function(postcode) {
        return {
            longitude: postcode.longitude,
            latitude: postcode.latitude,
        }
    });

    //Getting time and km information between two distances
    let distanceResult = await distanceMatrix('' + appointmentAddressCordinates.latitude + ',' + appointmentAddressCordinates.longitude + '', '' + realEstateAddressCordinates.latitude + ',' + realEstateAddressCordinates.longitude + '')

    let distance = distanceResult.distance.value; //Distance in meters
    let duration = distanceResult.duration.value; //Duration in second

    req.body.appointment.distance = parseInt(distance) / 1000; //Meters are converted to kilometers.


    //appDateTimeLO: Leave time from the office according to the appointment
    let appDateTimeLO = new Date(req.body.appointment.dateTime);

    //Calculates the leave time from the office based on the appointment time.
    appDateTimeLO.setSeconds(appDateTimeLO.getSeconds() - duration);

    //Calculated value is recorded in the table.
    req.body.appointment.timeLeaveOffice = appDateTimeLO


    //appDateTimeAO: Arrival time to the office after appointment
    let appDateTimeAO = new Date(req.body.appointment.dateTime);

    //Appointment and travel time are calculated.1 hour = 3600 Second for appointment time
    appDateTimeAO.setSeconds(appDateTimeAO.getSeconds() + duration + 3600);

    //Calculated value is recorded in the table.
    req.body.appointment.timeArrivalOffice = appDateTimeAO

    //Send to table active user information to see who created the appointment
    req.body.user = req.user

    const appointment = await Appointment.create(req.body);

    res.status(201).json({
        success: true,
        data: appointment
    })

});

// @desc      Update Appointment
// @route     PUT /api/v1/appointment/:id
// @access    Private
const updateAppointment = asyncHandler(async(req, res, next) => {
    let appointment = await Appointment.findById(req.params.id).populate('user')

    if (!appointment) {
        return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404));
    }

    //Getting Real Estate and Appointment Post codes
    let appointmentAddress = req.body.appointment.appointmentAddress;
    let realEstateAddress = req.body.appointment.realEstateAddress;

    //Verification of post codes is in progress.
    let isPostCodeAppointment = await postcodes.validate(appointmentAddress);
    let isPostCodeRealEstate = await postcodes.validate(realEstateAddress);

    //error message for unverifiable post codes
    if (!isPostCodeAppointment) {
        return next(new ErrorResponse(`Address Post Code not found with id of ${isPostCodeAppointment}`, 404));
    }

    if (!isPostCodeRealEstate) {
        return next(new ErrorResponse(`Real Estate Post Code not found with id of ${isPostCodeRealEstate}`, 404));
    }

    //get location information of post codes
    let appointmentAddressCordinates = await postcodes.lookup(appointmentAddress).then(function(postcode) {
        return {
            longitude: postcode.longitude,
            latitude: postcode.latitude,
        }
    });

    let realEstateAddressCordinates = await postcodes.lookup(realEstateAddress).then(function(postcode) {
        return {
            longitude: postcode.longitude,
            latitude: postcode.latitude,
        }
    });

    //Getting time and km information between two distances
    let distanceResult = await distanceMatrix('' + appointmentAddressCordinates.latitude + ',' + appointmentAddressCordinates.longitude + '', '' + realEstateAddressCordinates.latitude + ',' + realEstateAddressCordinates.longitude + '')

    let distance = distanceResult.distance.value; //Distance in meters
    let duration = distanceResult.duration.value; //Duration in second

    req.body.appointment.distance = parseInt(distance) / 1000; //Meters are converted to kilometers.


    //appDateTimeLO: Leave time from the office according to the appointment
    let appDateTimeLO = new Date(req.body.appointment.dateTime);

    //Calculates the leave time from the office based on the appointment time.
    appDateTimeLO.setSeconds(appDateTimeLO.getSeconds() - duration);

    //Calculated value is recorded in the table.
    req.body.appointment.timeLeaveOffice = appDateTimeLO


    //appDateTimeAO: Arrival time to the office after appointment
    let appDateTimeAO = new Date(req.body.appointment.dateTime);

    //Appointment and travel time are calculated.1 hour = 3600 Second for appointment time
    appDateTimeAO.setSeconds(appDateTimeAO.getSeconds() + duration + 3600);

    //Calculated value is recorded in the table.
    req.body.appointment.timeArrivalOffice = appDateTimeAO

    //Send to table active user information to see who created the appointment
    req.body.user = req.user

    appointment = await Appointment.findOneAndReplace(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: appointment
    });
});


// @desc      Delete Appointment
// @route     DELETE /api/v1/appointment/:id
// @access    Private
const deleteAppointment = asyncHandler(async(req, res, next) => {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
        return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});

module.exports = {
    createAppointment,
    getAppointment,
    getAppointments,
    getAppointmentUser,
    updateAppointment,
    deleteAppointment
}