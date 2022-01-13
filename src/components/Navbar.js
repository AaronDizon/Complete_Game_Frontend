import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext'
import { Link,  } from "react-router-dom"
import  axios  from 'axios';
import env from 'react-dotenv';

const Navbar = () => {
    const { userIdState, userInfoState } = useContext(UserContext)
    const [ userId, setUserId ] = userIdState
    const [ userInfo, setUserInfo] = userInfoState

    const [user, setUser] = useState()

    const getInfo = async() => {
        try {
            axios.get(`${env.BACKEND_URL}/user/${userId}/info`)
            .then((response) => {
                console.log(response)
                const userInformation = {
                    "username":response.data.username,
                    "email": response.data.email, 
                    "tokens": response.data.tokens,
                    "scores": response.data.scores
                }
                setUserInfo(userInformation)
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(getInfo, [])
    return (
        <div>
             <Link className="navUserName" to='/userprofile' > { userInfo.username } </Link>
             <p className='logout' onClick={()=> {
                localStorage.removeItem('userId')
                setUserId({})
                setUser()
            }}>Logout</p>
            <Link className='highscorePageLink' to='/highscores'>Highscores</Link>
        </div>
    )
}

export default Navbar
