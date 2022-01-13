import React from 'react'

import { useState, useContext, useEffect } from 'react'
import { UserContext} from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'
import { Link,  } from "react-router-dom"

const UserProfile = (props) => {

    const { userState } = useContext(UserContext)
    const [ userId, setUserId ] = userState
    const [ userInfo, setUserInfo] = userState

    // const [userInfo, setUserInfo] = useState()

    // const getInfo = (props) => {
    //     try {
    //         axios.get(`${env.BACKEND_URL}/user/${userId}/info`)
    //         .then((response) => {
    //             console.log(response)
    //             setUserInfo(response.data)
    //         })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // useEffect(getInfo, [])

    return (
        <div>
            <Link className='backToGamepage' to='/gamepage'>Go Back</Link>
            <h1>Your Profile</h1>
            
            <div>
            <h3>Username:</h3>
            <h3>{props.userInfo.username}</h3>
            </div>
            <div>
            <h3>Email:</h3>
            <h3>{props.userInfo.email}</h3>
            </div>
            <div>
            <h3>Tokens:</h3>
            <h3>{props.userInfo.tokens}</h3>
            </div>
        </div>
    )
}

export default UserProfile
