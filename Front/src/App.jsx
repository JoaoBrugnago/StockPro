import React from 'react';
import Login from './Components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
  <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  </div>
  )
};

export default App;
