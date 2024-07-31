import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const AddQuestion = () => {
    const [questionDetails, setQuestionDetails] = useState({
        sem: "",
        subjectCode: "",
        category: "",
        questionType: "",
    });

    const navigate=useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestionDetails({
            ...questionDetails,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Store in localStorage
        localStorage.setItem("questionDetails", JSON.stringify(questionDetails));
        if(questionDetails.questionType==="mcq") navigate('/addmcq');
        else navigate('/addsubjective');
    };

    return (
        <div className="mt-5 m-2 md:mx-32">
            <Link to="/home" className="bg-blue-500 p-1 px-2 rounded">{`<-Home`}</Link>
            <div className="mt-4">
                <h1 className="font-bold text-3xl">Add Question</h1>
                <form onSubmit={handleSubmit}
                    className="form-horizontal md:ml-28 mt-5 flex flex-col md:w-[60%] bg-slate-200 p-5">
                    <div>
                        <label htmlFor="sem">Select Semester </label>
                        <br />
                        <select
                            name="sem"
                            value={questionDetails.sem}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Semester</option>
                            <option value="Semester 1">Semester 1</option>
                            <option value="Semester 2">Semester 2</option>
                            <option value="Semester 3">Semester 3</option>
                            <option value="Semester 4">Semester 4</option>
                            <option value="Semester 5">Semester 5</option>
                            <option value="Semester 6">Semester 6</option>
                            <option value="Semester 7">Semester 7</option>
                            <option value="Semester 8">Semester 8</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="subjectCode">Subject Code </label>
                        <br />
                        <input
                            type="text"
                            name="subjectCode"
                            className="border-2"
                            placeholder="Enter Subject code"
                            value={questionDetails.subjectCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category">Select Category </label>
                        <br />
                        <select
                            name="category"
                            value={questionDetails.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="CA">CA</option>
                            <option value="MTP">MTP</option>
                            <option value="ETP">ETP</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="questionType">Question Type</label>
                        <br />
                        <select
                            name="questionType"
                            value={questionDetails.questionType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Question Type</option>
                            <option value="mcq">MCQ</option>
                            <option value="subjective">Subjective</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-green-400 p-1 mt-8 rounded-md w-24">
                        {`NEXT->`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddQuestion;
