import React from 'react'
import { Link,  } from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'

const Startingpage = () => {
    const { userState } = useContext(UserContext)
    const [ userId, setUserId ] = userState
    return (
        <div>
            <h1>Lizard</h1>
            <div>
            <Link className='signupLink' to='/signup'>Signup</Link>
            <Link className='loginLink' to='/login'>Login</Link>
            </div>
        </div>
    )
}

export default Startingpage
