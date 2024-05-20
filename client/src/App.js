import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddPatient from './pages/AddPatient';

function App() {
  return (
    <div className="App">
      {/* <PatientsDashboard /> */}
      {/* <AddPatient /> */}

      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/addPatient' element={<AddPatient />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
