import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addSubjectiveQuestion } from '../redux/questionSlicer'; // Import your action

const AddSubjectiveType = () => {
    const dispatch = useDispatch();
    const [subjectiveData, setSubjectiveData] = useState({ question: "", correctAns: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubjectiveData({
            ...subjectiveData,
            [name]: value
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        dispatch(addSubjectiveQuestion(subjectiveData));
    }

    return (
        <div className="mt-5 m-2 md:mx-32">
            <div className="flex justify-between">
                <Link to='/addquestion' className='bg-blue-500 p-1 px-2 rounded'>{`<-Add Question`}</Link>
                <Link to='/home' className='bg-blue-500 p-1 px-2 rounded'>{`Home`}</Link>
            </div>
            <div className="mt-4">
                <h1 className="font-bold text-3xl">Add Subjective Type Question</h1>
                <form onSubmit={onSubmitHandler} 
                className="form-horizontal xl:ml-28 mt-5 flex flex-col xl:w-[60%] bg-slate-200 p-2 md:p-5">
                    <div>
                        <label htmlFor="question">Write Question</label><br />
                        <textarea
                            className="w-full rounded pl-2"
                            type="text"
                            placeholder="Enter your Question"
                            name="question"
                            value={subjectiveData.question}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="correctAns">Write Answer</label>
                        <textarea
                            className="w-full rounded pl-2"
                            type="text"
                            placeholder="Enter your answer"
                            name="correctAns"
                            value={subjectiveData.correctAns}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="bg-green-400 p-1 mt-8 rounded-md w-24">{`Submit`}</button>
                </form>
            </div>
        </div>
    );
}

export default AddSubjectiveType;
