const mongoose = require('mongoose');

const QuestionDetailsSchema = new mongoose.Schema({
    semester: {
        type: String,
        enum: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'],
    },
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubjectDetails",
            require:true,
        }
    ]
});

module.exports = mongoose.model('QuestionDetails', QuestionDetailsSchema);
