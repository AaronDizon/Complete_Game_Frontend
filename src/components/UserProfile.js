import React from 'react'

import { useState, useContext, useEffect } from 'react'
import { UserContext} from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'
import { Link,  } from "react-router-dom"
import Modal from 'react-modal';

const UserProfile = () => {

    const { userIdState, userInfoState } = useContext(UserContext)
    const [ userId, setUserId ] = userIdState
    const [ userInfo, setUserInfo] = userInfoState

    const [userScores, setUserScores] = useState()
    const [message, setMessage] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false)

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

    const pull = () => {
        axios.put(`${env.BACKEND_URL}/user/${userId}/subtracttoken`)
        .then((response)=> {
            setMessage(response.data.message)
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
        })
    }

    return (
        <div>
            <Link className='backToGamepage' to='/gamepage'>Go Back</Link>
            <h1>Your Profile</h1>
            
            <div className='profileUserName'>
                <h3>Username:</h3>
                <h3>{userInfo.username}</h3>
            </div>
            <div className='profileEmail'>
                <h3>Email:</h3>
                <h3>{userInfo.email}</h3>
            </div>
            <div>
                <div className='profileTokens'>
                    <h3 >Tokens:</h3>
                    <h3>{userInfo.tokens}</h3>
                </div>
                {userInfo.tokens >= 10 
                ? 
                <button className='start' onClick={()=>{
                    pull()
                    setModalIsOpen(true)
                }}>Use 10 Tokens to Pull?</button>
                :
                null
                }
            </div>
            <Modal className='gachaModal' isOpen={modalIsOpen}>
                <div className='modalContent'>
                    <h1>{message}</h1>
                    <Link className='modalButton' to='/userprofile' onClick={()=>{
                        setMessage('')
                        setModalIsOpen(false)
                    }}>Close</Link>
                </div>
            </Modal>
            <div>
                <h3>Scores: </h3>

                <div className='userScoresContainer'>
                    {userInfo.scores.map((score, i) => {
                        return (
                            <div className='singleUserScore'>
                                <p>{score.score}</p>  
                                <p>{score.date}</p>  
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserProfile
