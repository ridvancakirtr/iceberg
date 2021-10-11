const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const AppointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    customer: {
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
            maxlength: [50, 'Name can not be more than 20 characters']
        },
        surname: {
            type: String,
            required: [true, 'Please add a surname'],
            trim: true,
            maxlength: [50, 'Surname can not be more than 50 characters']
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ],
            maxlength: [50, 'Email can not be longer than 50 characters'],
            trim: true
        },
        gender: {
            type: String,
            required: true,
            enum: [
                'MALE',
                'FEMALE'
            ]
        }
    },
    appointment: {
        dateTime: {
            type: Date
        },
        appointmentAddress: {
            type: String,
            required: [true, 'Please add a address code'],
            trim: true,
            maxlength: [6, 'Address code can not be more than 6 characters']
        },
        realEstateAddress: {
            type: String,
            required: [true, 'Please add a real estate address code'],
            trim: true,
            maxlength: [6, 'Real estate address code can not be more than 6 characters']
        },
        distance: {
            type: String,
            trim: true
        },
        timeLeaveOffice: {
            type: Date
        },
        timeArrivalOffice: {
            type: Date
        }
    },
}, { timestamps: true }, { collection: 'Appointment' });

AppointmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Appointment', AppointmentSchema);