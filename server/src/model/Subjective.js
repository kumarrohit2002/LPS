const mongoose = require('mongoose');

const SubjectiveSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    correctAns: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Subjective', SubjectiveSchema);
