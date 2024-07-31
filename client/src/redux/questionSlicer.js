// questionSlicer.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  semesterDetails: null,
  subjectDetails: null,
  mcq: null,
  subjective: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setSemesterDetails(state, action) {
      state.semesterDetails = action.payload;
    },
    setSubjectDetails(state, action) {
      state.subjectDetails = action.payload;
    },
    setMcq(state, action) {
      state.mcq = action.payload;
    },
    setSubjective(state, action) {
      state.subjective = action.payload;
    }

  },
});

export const { setSemesterDetails,setSubjectDetails,setMcq,setSubjective} = questionSlice.actions;

export default questionSlice.reducer;



//function
export const fetchSemesterDetails = () => async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:4000/api/v1/getSemesterWiseSubject");
      dispatch(setSemesterDetails(response.data.data));
    } catch (error) {
      console.error("Failed to fetch semester details:", error);
    }
  };


  export const getSemesterWiseSubject=()=>async(dispatch)=>{
    try{
      const response = await axios.post("http://localhost:4000/api/v1/getSemesterWiseSubject");
      dispatch(setSubjectDetails(response.data.data));
    }catch(error){
      console.error("Failed to fetch subject details:", error);
    }
  }


  export const getSubjectMcq=(subjectId)=>async(dispatch)=>{
    try{
      const response = await axios.post("http://localhost:4000/api/v1/getSubjectMcq",{subjectId:subjectId});
      dispatch(setMcq(response.data.data))
    }catch(error){
      console.error("Failed to fetch mcq details:", error);
    }
  }

  export const getSubjectSubjective=(subjectId)=>async(dispatch)=>{
    try{
      const response = await axios.post("http://localhost:4000/api/v1/getSubjectSubjective",{subjectId:subjectId});
      dispatch(setSubjective(response.data.data))
    }catch(error){
      console.error("Failed to fetch mcq details:", error);
    }
  }

  export const addMcqQuestion=async(mcqData)=>{
    try{
      const {question,correctAns,options}=mcqData;
      const questionData=localStorage.getItem("questionDetails");
      const {sem,subjectCode,category,questionType}=JSON.parse(questionData);
      const subject=subjectCode;
      
      if(!sem || !subject || !category || !questionType || !question || !correctAns || !options){
        console.log(options);
        console.log("All field are required");
      }else{
        const response = await axios.post("http://localhost:4000/api/v1/addQuestion",
        {sem:sem,subject:subject,category:category,question:question,questionType:questionType,options:options,correctAns:correctAns});
        console.log(response.data);
        alert("Saved Mcq question");
      }

    }catch(error){
      console.error("Failed to add mcq question:", error);
    }
  }

  export const addSubjectiveQuestion=async(subjectiveData)=>{
    try{
      const questionData=localStorage.getItem("questionDetails");
      const {sem,subjectCode,category,questionType}=JSON.parse(questionData);
      const subject=subjectCode;
      const {question,correctAns}=subjectiveData;

      if(!sem || !subject || !category || !questionType || !question || !correctAns){
        console.log("All field are required");
      }else{
        const response = await axios.post("http://localhost:4000/api/v1/addQuestion",
          {sem:sem,subject:subject,category:category,question:question,questionType:questionType,correctAns:correctAns});
          console.log(response.data);
          alert("Saved Subjective question");
      }
    }catch(error){
      console.error("Failed to add subjective question :", error)
    }
  }