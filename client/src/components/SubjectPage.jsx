import React, { useState } from "react";
import Question from "./Question";

const SubjectPage = ({subjectData}) => {
    const [activeLink, setActiveLink] = useState('CA');

    const handleClick = (link) => {
        setActiveLink(link);
    }

    return (
        <div className="flex flex-col mt-14">
            <h1 className="text-2xl font-bold mb-2 underline text-center">{subjectData.subject}</h1>
            <div className="flex flex-row gap-16 justify-center items-center">
                <a 
                    className={`hover:text-blue-700 font-semibold ${activeLink === 'CA' ? 'text-blue-700 underline' : ''}`} 
                    href="#" 
                    onClick={() => handleClick('CA')}
                >
                    CA
                </a>
                <a 
                    className={`hover:text-blue-700 font-semibold ${activeLink === 'MTP' ? 'text-blue-700 underline' : ''}`} 
                    href="#" 
                    onClick={() => handleClick('MTP')}
                >
                    MTP
                </a>
                <a 
                    className={`hover:text-blue-700 font-semibold ${activeLink === 'ETP' ? 'text-blue-700 underline' : ''}`} 
                    href="#" 
                    onClick={() => handleClick('ETP')}
                >
                    ETP
                </a>
            </div>
            <Question category={activeLink} subjectData={subjectData} />
        </div>
    )
}

export default SubjectPage;
