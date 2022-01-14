import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext'
import { Link,  } from "react-router-dom"
import  axios  from 'axios';
import env from 'react-dotenv';

const Color = () => {

    const { userIdState, userInfoState, colorState } = useContext(UserContext)
    const [ userId, setUserId ] = userIdState
    const [ userInfo, setUserInfo] = userInfoState
    const [ color, setColor] = colorState

    const [skinsList, setSkinsList] = useState([])

    const setSkinsArray = () => {
     
            axios.get(`${env.BACKEND_URL}/user/${userId}/getSkins`)
            .then((response) => {
                setSkinsList(response.data)
            })
        
    }

    useEffect(setSkinsArray, [])

    const changeSkin = (param) => {
        setColor(param)
    }

    return (
        <div>
             <Link className='backToGamepage' to='/gamepage'>Go Back</Link>
             <div className='skinsButtons'>
             <button className='start' onClick={()=>{changeSkin('#6FFFE9')}}>Set Default</button>
                {skinsList.map((skin, i) => {
                        return (
                            <button className='start' onClick={()=>{changeSkin(skin.color)}}>{skin.name}</button>
                        )
                    })}
                </div>
        </div>
    )
}

export default Color
