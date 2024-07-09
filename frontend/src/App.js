import {Routes, Route} from 'react-router-dom'
import Login from './components/Accounts/Login'
import Signup from './components/Accounts/Signup'
import Home from './components/Home/Home'
import Class from './components/Class/Class'
import Assignment from './components/Create/Assignment'



const App = () => {
  return (<>
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/create/account" element={<Signup />} />

     <Route path="/home" element={<Home />} />

    <Route path='/class' element={<Class />} />
    <Route path='/create/assignment' element={<Assignment />} />

    </Routes>

    </>)
}

export default App