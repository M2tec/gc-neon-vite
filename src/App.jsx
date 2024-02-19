
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NoMatch from './Components/NoMatch';
import Neon from './Components/Neon';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
        <Routes>
        <Route index element={<Neon />} />
        
        <Route path="*" element={<NoMatch />} /> 

      </Routes>
    </>
  )
}

export default App
