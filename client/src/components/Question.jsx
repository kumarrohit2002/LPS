import { useState } from "react";
import Mcq from "./Mcq";
import Subjective from "./Subjective";
import { useDispatch, useSelector } from 'react-redux';
import {getSubjectMcq,getSubjectSubjective} from '../redux/questionSlicer';


const Question = ({category,subjectData}) => {
    const mcq = useSelector(state => state.question.mcq);
    const subjective = useSelector(state => state.question.subjective);
    const dispatch = useDispatch();

    const [isMcq, setIsMcq] = useState(false);
    const [isSubjective, setIsSubjective] = useState(false);


    return (
        <div>
            <h1 className="text-red-700 font-semibold mb-2">{`${category} Question Type`}</h1>
            <div className="mb-4 flex">
                <button onClick={() => {setIsMcq(!isMcq);  dispatch(getSubjectMcq(subjectData._id));}} 
                className="bg-blue-400 h-8 w-32 px-4 rounded">MCQ Type</button>
                <div className="w-[60%]">
                    {
                        mcq && isMcq &&  mcq.map((question, index) => (
                            <Mcq question={question} key={index}/>
                        ))
                    }
                </div>
            </div>
            <div className="mb-8 flex gap-2">
                <button onClick={() => {setIsSubjective(!isSubjective); dispatch(getSubjectSubjective(subjectData._id)); }} 
                className="bg-blue-400 h-8 w-40 px-4 rounded">Subjective Type</button>
                <div className="w-[60%]">
                    {
                        isSubjective && subjective &&subjective.map((question, index) => (
                            <Subjective question={question} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Question;