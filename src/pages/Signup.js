import React from 'react'

import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'

const Signup = () => {

    const value = useContext(UserContext)
    const { userState } = useContext(UserContext)
    const [ user, setUser ] = userState

    const [email, setEmail] = useState('')
    const [username, setUserame] = useState('')
    const [password, setPassword] = useState('')

    const signupForm = (e) => {
        
        e.preventDefault()
        axios.post(`${env.BACKEND_URL}/user/signup`, { username, email, password})
        .then((response) => {
        console.log(response.data.userResponse)
        
        localStorage.setItem('userId', response.data.userResponse.id)

        setUser(response.data.userResponse)
        
        })

    }


    return (
        <div>
             <h2>Signup</h2>
        <form className="LgnFrmCont" onSubmit={signupForm}>
            <div className='formInput'>
                <label htmlFor="name" id='userName'>User Name:</label>
                <input value={username} onChange={(e) => setUserame(e.target.value)} />
            </div>
            <div className='formInput'>
                <label htmlFor="email">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='formInput'>
                <label htmlFor="password">Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='formInput'>
                <input className='formButton' type="submit" value="Submit" />
            </div>
        </form>
        </div>
    )
}

export default Signup
