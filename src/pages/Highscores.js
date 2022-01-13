import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import  axios  from 'axios';
import env from 'react-dotenv';
import { Link,  } from "react-router-dom"

const Highscores = () => {

    const scoresList = []

    const [highscores, setHighscores] = useState([])

    const fetchScores = async() => {
        try {
            const response = await axios.get(`${env.BACKEND_URL}/score/all`)
            const scoresArray = response.data
            console.log(scoresArray)
            
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(fetchScores, [])

    return (
        <div>
             <Link className='backToGamepage' to='/gamepage'>Go Back</Link>
            <h1>Highest Scores</h1>
        </div>
    )
}

export default Highscores
