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
            <Link className='signupLink' to='/Signup'>Signup</Link>
            <Link className='loginLink' to='/Login'>Login</Link>
            </div>
        </div>
    )
}

export default Startingpage
