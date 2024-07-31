import AddMcqType from "./components/AddMcqType";
import AddQuestion from "./components/AddQuestion";
import AddSubjectiveType from "./components/AddSubjectiveType";
import HomePage from "./components/HomePage"
import LoginPage from "./components/LoginPage"
import SemesterPage from "./components/SemesterPage"
import {Route,Routes} from 'react-router-dom';


function App() {
  return (
    <>
     <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/semester' element={<SemesterPage/>}/>
        <Route path='/addquestion' element={<AddQuestion/>}/>
        <Route path='/addmcq' element={<AddMcqType/>}/>
        <Route path='/addsubjective' element={<AddSubjectiveType/>}/>
     </Routes>
    </>
  )
}

export default App
