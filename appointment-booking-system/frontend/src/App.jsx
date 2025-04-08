import { useState } from 'react'
import './App.css'
import{ BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./components/login";
import Navbar from './components/Nav';
import ProtectedRouter from './components/potectedRouter';
import Doctor from './components/Doctors';
import Appointment  from './components/Appointments';

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
    <Routes>
      <Route path='Login' element={<Login/>}/>
      
      <Route element={<ProtectedRouter/>}>
        <Route path='/Doctor' element={<Doctor/>}/>
        <Route path="/appointment/:id" element={<Appointment />} />
      </Route>

      

      
    </Routes>
  </BrowserRouter>

  
  )
}

export default App
