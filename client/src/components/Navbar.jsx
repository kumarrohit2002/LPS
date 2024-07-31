import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSemesterDetails } from '../redux/questionSlicer';


const subjects = [
    { value: 'mth174', label: 'MTH 174' },
    { value: 'cse320', label: 'CSE 320' },
    { value: 'ece249', label: 'ECE 249' },
];

const Navbar = () => {
    const semesterDetails = useSelector(state => state.question.semesterDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSemesterDetails());
    }, [dispatch]);


    const navigate = useNavigate();
    const [sem, setSem] = useState(localStorage.getItem("semester 1") || "");
    

    const handleSemesterChange = (e) => {
        const selectedOption = JSON.parse(e.target.value);
        const selectedSemester = selectedOption.semester;
        const selectedSubjects = selectedOption.subjects;

        console.log("Selected semester: " + selectedSemester);
        // console.log("Selected subjects: "+ selectedSubjects);

        // Store selected semester and subjects in localStorage
        localStorage.setItem("semester", JSON.stringify(selectedSemester));
        localStorage.setItem("semesterDetails", JSON.stringify(selectedSubjects));

        // Update state
        setSem(selectedSemester);
        navigate('/semester');
        window.location.reload();
    };

    return (
        <div className="bg-gray-200 flex items-center justify-between h-30 px-4 p-1 border-b-2 fixed top-0 left-0 right-0">
            <Link to='/home' className='text-orange-600 font-bold text-4xl cursor-pointer'>
                LPS
            </Link>
            <div className="flex gap-4">
                <div className="mt-2">
                    <select
                        aria-label="Select Semester"
                        className="p-2 border rounded"
                        value={sem}
                        onChange={handleSemesterChange}
                    >
                        <option value=''>Select Semester</option>
                        {semesterDetails && semesterDetails.map((semester,index) => (
                            <option className="text-black" key={index} value={JSON.stringify({ semester: semester.semester, subjects: semester.subjects })}>
                                {semester.semester}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-2">
                    <select aria-label="Select Subject" className="p-2 border rounded">
                        <option value="">Select Subject</option>
                        {subjects.map(subject => (
                            <option key={subject.value} value={subject.value}>
                                {subject.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='cursor-pointer'>
                <Icon className='text-3xl' icon={'tabler:moon-filled'} />
            </div>
        </div>
    );
}

export default Navbar;
