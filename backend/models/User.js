const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('RegUser', UserSchema);