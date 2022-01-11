import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext'
import  axios  from 'axios';
import env from 'react-dotenv'
import './App.css';

import Startingpage from './pages/Startingpage';
import Gamepage from './pages/Gamepage'

function App() {

  const value = useContext(UserContext)

  return (
    <div className="App">
      <Routes>
                <Route path ='/' element={<Gamepage />} />
            </Routes>
    </div>
  );
}

export default App;
