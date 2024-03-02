import React from 'react';
import Login from './Components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import User from './Components/User/User';

const App = () => {
  return (
  <div className='mainContainer'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/conta' element={<User />}/>
      </Routes>
    </BrowserRouter>
  </div>
  )
};

export default App;
