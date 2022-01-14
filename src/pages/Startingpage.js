import React from 'react'
import { Link,  } from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'

const Startingpage = () => {
    const { userIdState } = useContext(UserContext)
    const [ userId, setUserId ] = userIdState
    return (
        <div className='startingPageElements'>
            <h1 className='landingTitle'>Lizard</h1>
            <div>
            <Link className='userLink' to='/signup'>Signup</Link>
            <Link className='userLink' to='/login'>Login</Link>
            </div>
        </div>
    )
}

export default Startingpage
