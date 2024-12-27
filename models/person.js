const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10,15}$/
    },
    address: {
        type: String,
        default: 'Not provided'
    },
    dateOfBirth: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: 'Date of Birth cannot be in the future.'
        }
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    work: {
        type: String,
        enum: ['safe', 'manager', 'waiter'],
        required: true
    }
});



const Person = mongoose.model('Person', personSchema);

module.exports = Person;