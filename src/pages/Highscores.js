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
            const sortedArray = [{"score":0}]

            for (let i = 0; i < scoresArray.length; i++) {
                for (let j =0; j < scoresArray.length; j++){
                    if (scoresArray[i].score > sortedArray[j].score){
                        sortedArray.splice(j, 0, scoresArray[i])
                        break
                    }
                }
            }
            console.log(scoresArray)
            console.log(sortedArray)

            let topTen = sortedArray.slice(0,10)
            topTen.pop()

            console.log(topTen)
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
