const { Schema, model, ObjectId } = require('mongoose');

const schema = new Schema({
    doctor: {
        type: ObjectId,
        ref: "User",
        required: [true, "No Doctor Selected"]
    },
    patient: {
        type: ObjectId,
        ref: "User",
        required: [true, "No Patient Selected"]
    },
    timing: {
        type: String,
        required: [true, "No Timing Selected"]
    }
},
    { timestamps: true });

module.exports = model('Appoinment', schema);
// module.exports = appoinment;