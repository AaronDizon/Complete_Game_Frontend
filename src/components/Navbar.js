import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'
import { Link,  } from "react-router-dom"

const Navbar = () => {
    const { userState } = useContext(UserContext)
    const [ user, setUser ] = userState
    return (
        <div>
             <p className="navUserName"> { user.username } </p>
             <p className='logout' onClick={()=> {
                localStorage.removeItem('userId')
                setUser({})
            }}>Logout</p>
            <Link className='highscorePageLink' to='/highscores'>Highscores</Link>
        </div>
    )
}

export default Navbar
