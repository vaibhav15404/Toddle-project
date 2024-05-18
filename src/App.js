import React from 'react';
import Bar from './components/Bar';

import Courses from './pages/Courses';
import MyResume from './pages/MyResume';
import ContactUs from './pages/ContactUs';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
const App = () => {
  return (
    <BrowserRouter>
       <Bar/>
       <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/Courses" element={<Courses/>} />
        <Route exact path="/MyResume" element={<MyResume/>} />
        <Route exact path="/ContactUs" element={<ContactUs/>} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
