import {Routes, Route} from 'react-router-dom'
import Login from './components/Accounts/Login'
import Signup from './components/Accounts/Signup'
import Home from './components/Home/Home'
import Class from './components/Class/Class'
import Assignment from './components/Create/Assignment'
import IndividualAssignment from './components/Class/IndividualAssignment'
import Fullimage from './components/Class/Fullimage'
import UpdateAssignment from './components/Class/Update/UpdateAssignment'
import Submit from './components/Class/Submit/Submit'



const App = () => {
  return (<>
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/create/account" element={<Signup />} />

     <Route path="/home" element={<Home />} />

      <Route path='/class' element={<Class />} />
      <Route path='/create/assignment' element={<Assignment />} />

      <Route path='/class/assignment' element={ <IndividualAssignment />} />

      <Route path='/class/assignment/fullimage' element={<Fullimage />} />

      <Route path='/update/assignment' element={<UpdateAssignment />} />

      <Route path='/assignment/submit' element={<Submit />} />

    </Routes>

    </>)
}

export default App