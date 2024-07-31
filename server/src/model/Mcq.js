const mongoose = require('mongoose');

const McqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        a: { type: String, required: true },
        b: { type: String, required: true },
        c: { type: String, required: true },
        d: { type: String, required: true }
    },
    correctAns: {
        type: String,
        enum: ['a', 'b', 'c', 'd'],
        required: true
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model("Mcq", McqSchema);
