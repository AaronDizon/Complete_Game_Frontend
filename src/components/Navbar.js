import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'

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
        </div>
    )
}

export default Navbar
