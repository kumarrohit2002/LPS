import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import {addMcqQuestion} from '../redux/questionSlicer'

const AddMcqType = () => {
    const dispatch = useDispatch();
    const [mcqData, setMcqData] = useState({
        question: "",
        correctAns: "",
        options: { a: "", b: "", c: "", d: "" }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMcqData({
            ...mcqData,
            [name]: value
        });
    };

    const handleOptionsChange = (e) => {
        const { name, value } = e.target;
        setMcqData({
            ...mcqData,
            options: {
                ...mcqData.options,
                [name]: value
            }
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        dispatch(addMcqQuestion(mcqData));
        
    }

    return (
        <div className="mt-5 md:mx-32 m-2">
            <div className="flex justify-between">
                <Link to='/addquestion' className='bg-blue-500 p-1 px-2 rounded'>{`<-Add Question`}</Link>
                <Link to='/home' className='bg-blue-500 p-1 px-2 rounded'>{`Home`}</Link>
            </div>
            <div className="mt-4">
                <h1 className="font-bold text-3xl">Add MCQ Type Question</h1>
                <form action="" onSubmit={onSubmitHandler} className="form-horizontal md:ml-28 mt-5 flex flex-col md:w-[60%] bg-slate-200 p-5">
                    <div>
                        <label htmlFor="question">Write Question</label><br />
                        <textarea
                            className="w-full rounded pl-2"
                            type="text"
                            placeholder="Enter your Question"
                            name="question"
                            value={mcqData.question}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-col w-96 gap-2 mb-4">
                        <label htmlFor="">Write Options</label>
                        <input
                            type="text"
                            className="border-2 pl-2 rounded"
                            placeholder="A"
                            name="a"
                            value={mcqData.options.a}
                            onChange={handleOptionsChange}
                        />
                        <input
                            type="text"
                            className="border-2 pl-2 rounded"
                            placeholder="B"
                            name="b"
                            value={mcqData.options.b}
                            onChange={handleOptionsChange}
                        />
                        <input
                            type="text"
                            className="border-2 pl-2 rounded"
                            placeholder="C"
                            name="c"
                            value={mcqData.options.c}
                            onChange={handleOptionsChange}
                        />
                        <input
                            type="text"
                            className="border-2 pl-2 rounded"
                            placeholder="D"
                            name="d"
                            value={mcqData.options.d}
                            onChange={handleOptionsChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="correctAns">Correct Answer</label><br />
                        <select
                            className="w-44"
                            name="correctAns"
                            value={mcqData.correctAns}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Correct Answer</option>
                            <option value="a">A</option>
                            <option value="b">B</option>
                            <option value="c">C</option>
                            <option value="d">D</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-green-400 p-1 mt-8 rounded-md w-24">{`Submit`}</button>
                </form>
            </div>
        </div>
    )
}

export default AddMcqType;
