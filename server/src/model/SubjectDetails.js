const mongoose = require('mongoose');

const SubjectDetailsSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['CA', 'MTP', 'ETP'],
        required: true,
    },
    mcq: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mcq",
        required: true,
    }],
    subjective: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subjective",
        required: true,
    }]
});

module.exports = mongoose.model("SubjectDetails", SubjectDetailsSchema);
