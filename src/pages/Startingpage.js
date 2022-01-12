import React from 'react'
import { Link,  } from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'

const Startingpage = () => {
    const { userState } = useContext(UserContext)
    const [ user, setUser ] = userState
    return (
        <div>
            <h1>Lizard</h1>
            <div>
            <link className='signupLink' to='/Signup'>Signup</link>
            <link className='loginLink' to='/Login'>Signup</link>
            </div>
        </div>
    )
}

export default Startingpage
