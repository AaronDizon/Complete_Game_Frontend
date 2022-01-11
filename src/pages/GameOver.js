import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { UserContext } from './context/UserContext'

const GameOver = (props) => {
    const playAgain = () => {
        props.setGameState(true)
    }
    return (
        <div>
            <h1>GAME OVER</h1>

        
            <button className='start' onClick={()=>{playAgain()}}>Play Again?</button>
        </div>
    )
}

export default GameOver
