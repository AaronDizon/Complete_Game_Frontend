import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext'
import  axios  from 'axios';
import env from 'react-dotenv'
import './App.css';

import Startingpage from './pages/Startingpage';
import Gamepage from './pages/Gamepage'
import GameOver from './pages/GameOver';

function App() {

  const value = useContext(UserContext)

  const [gameState, setGameState] = useState(true)
  const [playerScore, setPlayerScore] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path ='/' element= {<Gamepage setGameState={setGameState} setPlayerScore={setPlayerScore}/>} />
      </Routes>
    </div>
  );
}

export default App;
