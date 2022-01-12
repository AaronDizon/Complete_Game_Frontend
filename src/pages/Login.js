import React from 'react'

import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'


const Login = () => {

    const value = useContext(UserContext)
    const { userState } = useContext(UserContext)
    const [ user, setUser ] = userState

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginForm = (e) => {
        e.preventDefault()
        axios.post(`${env.BACKEND_URL}/user/login`, {email, password})
        .then((response) => {
            console.log(response)

            localStorage.setItem('userId', response.data.user)
            setUser(response.data.user)

        })
    }

    return (
        <div className='sngLogForm'>
                
        <h2>Login</h2>
        
        <form className="LgnFrmCont" onSubmit={loginForm}>
            <div className='formInput'>
                <label htmlFor="email">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='formInput'>
                <label htmlFor="password">Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='formInput'>
                <input className='formButton' type="submit" value="Log In" />
            </div>
        </form>
        <div className="NavigateHome">
        
        </div>
        
        </div>
    )
}

export default Login
