const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Hospital not  Selected"]
    },
    address: {
        type: String,
        required: [true, "No Adress given"]
    },
    timing: [{
        startTime: String,
        endTime: String,
        _id: false
    }],
    status: {
        type: Number,
        default: 1
    },
},
    { timestamps: true });

const Clinic = mongoose.model('Clinic', schema);
module.exports = Clinic;