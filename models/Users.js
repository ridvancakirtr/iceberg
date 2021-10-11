const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Brand can not be more than 20 characters']
    },
    surname: {
        type: String,
        required: [true, 'Please add a surname'],
        trim: true,
        maxlength: [50, 'Surname can not be more than 50 characters']
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ],
        maxlength: [50, 'Email can not be longer than 50 characters'],
        trim: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: [
            'MALE',
            'FEMALE'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        maxlength: [50, 'Password can not be longer than 50 characters'],
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true }, { collection: 'User' });

UserSchema.plugin(mongoosePaginate);

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('User', UserSchema);