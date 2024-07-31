import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SubjectPage from "./SubjectPage";

const SemesterPage = () => {
    const [activeSubject, setActiveSubject] = useState([]);
    const [sem, setSem] = useState("Semester 1");
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const semester = localStorage.getItem('semester');
        const subjectsString = localStorage.getItem('semesterDetails');
        const parsedSubjects = JSON.parse(subjectsString) || [];
        setSubjects(parsedSubjects);
        setSem(semester);
        if (parsedSubjects.length > 0) {
            setActiveSubject(parsedSubjects[0].subject);
        }
    }, []);

    const handleSubjectClick = (subjectName) => {
        setActiveSubject(subjectName);
    };

    return (
        <div>
            <Navbar className="" />
            <div className="pt-2 px-10 flex">
                <div className="w-[12%] border-r-2 h-screen fixed left-0 top-16 bottom-0">
                    <h1 className="text-3xl font-semibold">{sem}</h1>
                    <h1 className="text-xl pl-4">Subject</h1>
                    <div className="p-1 pl-8 cursor-pointer">
                        <ol>
                            {subjects.map((subject, index) => (
                                <li
                                    key={index}
                                    onClick={() =>{ handleSubjectClick(subject); 
                                    }}
                                    className={`font-semibold ${activeSubject.subject === subject.subject ? 'text-blue-700 underline' : ''}`}
                                >
                                    {subject.subject}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div className="w-full ml-44">
                    {activeSubject && <SubjectPage subjectData={activeSubject} />}
                </div>
            </div>
        </div>
    );
};

export default SemesterPage;
