const express=require('express')
const router=express.Router();

const {addQuestion,getAllSubjects,getSemesterWiseSubject,getSubjectMcq,getSubjectSubjective}=require('../controller/QuestioonController');


router.post('/addquestion',addQuestion);
router.post('/getAllSubjects',getAllSubjects);
router.post('/getSemesterWiseSubject',getSemesterWiseSubject);
router.post('/getSubjectMcq',getSubjectMcq);
router.post('/getSubjectSubjective',getSubjectSubjective);

module.exports = router;