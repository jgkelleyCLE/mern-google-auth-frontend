import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import Navbar from './Components/Navbar/Navbar'
import { ToastContainer, Slide } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
     <Router>
      <Navbar />
      <ToastContainer transition={Slide} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
     </Router>
    </>
  )
}

export default App
