import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import { Home, Login, Profile, Register, NotFound } from "./pages";
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
