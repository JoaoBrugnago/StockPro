import React from 'react';
import Login from './Components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import User from './Components/User/User';
import Vendas from './Components/Vendas/Vendas';
import Compras from './Components/Compras/Compras';
import Receitas from './Components/Receitas/Receitas';
import { UserStorage } from './UserContext';

const App = () => {
  return (
  <div className='mainContainer'>
    <BrowserRouter>
      <UserStorage>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/conta' element={<User />}/>
          <Route path='/vendas' element={<Vendas />}/>
          <Route path='/compras' element={<Compras />}/>
          <Route path='/receitas' element={<Receitas />}/>
        </Routes>
      </UserStorage>
    </BrowserRouter>
  </div>
  )
};

export default App;
