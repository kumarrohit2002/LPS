const QuestionDetails = require('../model/QuestionDetails');
const SubjectDetails = require('../model/SubjectDetails');
const Mcq = require('../model/Mcq');
const Subjective = require('../model/Subjective');


const formatCourseCode = (str) => {
    // Remove spaces and convert to uppercase
    return str.replace(/\s+/g, '').toUpperCase();
};

// Add question
exports.addQuestion = async (req, res) => {
    try {
        // Fetch data from req.body
        let { sem, subject, category, questionType, question, options, correctAns } = req.body;

        subject = formatCourseCode(subject.trim());

        // Validate required fields
        if (!sem || !subject || !category || !questionType || !question || !correctAns) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        // Ensure the subject exists or create a new one
        let subjectDetails = await SubjectDetails.findOne({ subject, category });
        if (!subjectDetails) {
            subjectDetails = new SubjectDetails({ subject, category });
            await subjectDetails.save();
        }

        // Find or create the corresponding QuestionDetails
        let questionDetails = await QuestionDetails.findOne({ semester: sem });

        if (!questionDetails) {
            questionDetails = new QuestionDetails({ semester: sem, subjects: [subjectDetails._id] });
        } else if (!questionDetails.subjects.includes(subjectDetails._id)) {
            questionDetails.subjects.push(subjectDetails._id);
        }

        // Define variables for the new question
        let newMcq, newSubjective;

        if (questionType === 'mcq') {
            if (!options || !options.a || !options.b || !options.c || !options.d) {
                return res.status(400).json({
                    success: false,
                    message: "Options for MCQ are required!"
                });
            }

            // Create and save the new MCQ
            newMcq = new Mcq({ question, options, correctAns });
            await newMcq.save();

            // Update SubjectDetails with the new MCQ
            subjectDetails.mcq.push(newMcq._id);
            await subjectDetails.save();

        } else if (questionType === 'subjective') {
            // Create and save the new Subjective question
            newSubjective = new Subjective({ question, correctAns });
            await newSubjective.save();

            // Update SubjectDetails with the new Subjective question
            subjectDetails.subjective.push(newSubjective._id);
            await subjectDetails.save();
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid question type!"
            });
        }

        // Save QuestionDetails after updating subjects
        await questionDetails.save();

        return res.status(200).json({
            success: true,
            message: `${questionType === 'mcq' ? 'MCQ' : 'Subjective'} question added successfully!`,
            data: questionType === 'mcq' ? newMcq : newSubjective
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// Update question
exports.updateQuestion = async (req, res) => {
    try {
        const { questionType, questionId, question, options, correctAns } = req.body;

        // Validate required fields
        if (!questionType || !questionId || !question || !correctAns) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        let updatedQuestion;

        if (questionType === 'mcq') {
            if (!options || !options.a || !options.b || !options.c || !options.d) {
                return res.status(400).json({
                    success: false,
                    message: "Options are required!"
                });
            }

            // Update the MCQ question
            updatedQuestion = await Mcq.findByIdAndUpdate(
                questionId,
                { question, options, correctAns },
                { new: true }
            );

        } else if (questionType === 'subjective') {
            // Update the Subjective question
            updatedQuestion = await Subjective.findByIdAndUpdate(
                questionId,
                { question, correctAns },
                { new: true }
            );
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid question type!"
            });
        }

        if (!updatedQuestion) {
            return res.status(404).json({
                success: false,
                message: "Question not found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Question updated successfully!",
            data: updatedQuestion
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Delete question
exports.deleteQuestion = async (req, res) => {
    try {
        const { questionId, questionType, subjectId } = req.body;

        // Validate required fields
        if (!questionType || !questionId || !subjectId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required for deleting the question."
            });
        }

        // Delete the question based on type
        if (questionType === 'mcq') {
            // Delete MCQ question
            await Mcq.findByIdAndDelete(questionId);

            // Remove question reference from SubjectDetails
            await SubjectDetails.findByIdAndUpdate(
                subjectId,
                { $pull: { mcq: questionId } }
            );

        } else if (questionType === 'subjective') {
            // Delete Subjective question
            await Subjective.findByIdAndDelete(questionId);

            // Remove question reference from SubjectDetails
            await SubjectDetails.findByIdAndUpdate(
                subjectId,
                { $pull: { subjective: questionId } }
            );

        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid question type!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Question deleted successfully!"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Get all subjects
exports.getAllSubjects = async (req, res) => {
    try {
        const subjectData = await SubjectDetails.find();

        if (!subjectData) {
            return res.status(400).json({
                success: false,
                message: "Error in fetching subject data"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Subjects data fetched successfully",
            data: subjectData
        });

    } catch (error) {
        console.error("Error in getAllSubjects: " + error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch subjects data"
        });
    }
};

// Get semester-wise subject data
exports.getSemesterWiseSubject = async (req, res) => {
    try {
        const semesterData = await QuestionDetails.find().populate("subjects");

        if (!semesterData) {
            return res.status(400).json({
                success: false,
                message: "Error in fetching semester-wise subject data"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Semester-wise subject data fetched successfully",
            data: semesterData
        });

    } catch (error) {
        console.error("Error in getSemesterWiseSubject: " + error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch semester-wise subject data"
        });
    }
};

// Get MCQs based on subject and category
exports.getSubjectMcq = async (req, res) => {
    try {
        const { subjectId } = req.body;

        if (!subjectId) {
            return res.status(400).json({
                success: false,
                message: "Subject ID required!"
            });
        }

        const subjectMcq = await SubjectDetails.findById(subjectId).populate("mcq");

        if (!subjectMcq) {
            return res.status(400).json({
                success: false,
                message: "Error in fetching MCQs for the subject"
            });
        }

        return res.status(200).json({
            success: true,
            message: "MCQs fetched successfully",
            data: subjectMcq.mcq
        });

    } catch (error) {
        console.error("Error in getSubjectMcq: " + error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch MCQs"
        });
    }
};

// Get subjective questions based on subject and category
exports.getSubjectSubjective = async (req, res) => {
    try {
        const { subjectId } = req.body;

        if (!subjectId) {
            return res.status(400).json({
                success: false,
                message: "Subject ID required!"
            });
        }

        const subjectSubjective = await SubjectDetails.findById(subjectId).populate("subjective");

        if (!subjectSubjective) {
            return res.status(400).json({
                success: false,
                message: "Error in fetching subjective questions for the subject"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Subjective questions fetched successfully",
            data: subjectSubjective.subjective
        });

    } catch (error) {
        console.error("Error in getSubjectSubjective: " + error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch subjective questions"
        });
    }
};