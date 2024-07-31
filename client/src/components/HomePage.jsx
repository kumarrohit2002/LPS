import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import SemesterPage from "./SemesterPage";


const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <div className="mx-32 mt-20">
          <Link to='/addquestion' className="bg-blue-400 p-1 px-2 rounded-md">You want to Add Question</Link>
        </div>
    </div>
  )
}

export default HomePage;