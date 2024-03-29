import { useState, useEffect, useContext, useRef } from 'react';
import Modal from 'react-modal';
import { useInterval }from './useInterval';
import { UserContext } from '../context/UserContext'
import  axios  from 'axios';
import env from 'react-dotenv';
import { Link,  } from "react-router-dom"

const Gamespace = (props) => {

    const { userIdState, userInfoState, colorState } = useContext(UserContext)
    const [ userId, setUserId ] = userIdState
    const [ userInfo, setUserInfo] = userInfoState
    const [ color, setColor] = colorState


//----------------------------Game States----------------------------
    const initialLizard = [0,0]
    const initialClones = []
    const initialFood = [200, 200]
    const initialSpeed = 100

    const [score, setScore] = useState(0)
    const [gameIsLive, setGameIsLive] = useState(false)
    const [direction, setDirection] = useState([0,0])
    const [lizard, setLizard] = useState(initialLizard)
    const [clones, setClones] = useState(initialClones)
    const [food, setFood] = useState(initialFood)
    const [speed, setSpeed] = useState(null)
    const [gameOver, setGameOver] = useState(false)
    

    const [modalIsOpen, setModalIsOpen] = useState(false)
//-------------------------------------------------------------------

    const postScore = async() => {
        try {
            const makeDate = new Date()
            const date = (makeDate.toDateString())
            axios.post(`${env.BACKEND_URL}/user/${userId}/score`, { score, date })
            .then((response) => {
                console.log(`score posted on ${date}`)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const addToken = () => {
        axios.put(`${env.BACKEND_URL}/user/${userId}/changetoken`)
        .then((response) => {
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


//----------------------------Game Logic----------------------------

    


    useInterval(()=> gameLoop(), speed);

    const canvas = useRef();
    const ctx = useRef();
    useEffect(()=> {
        const context  = canvas.current.getContext('2d');
        ctx.current = context;
        ctx.current.clearRect(0,0, canvas.current.width, canvas.current.height)
        ctx.current.fillStyle=color
        ctx.current.fillRect(lizard[0], lizard[1], 20, 20)
        ctx.current.fillStyle='white'
        for (let i = 0; i < clones.length; i++){
            ctx.current.fillRect(clones[i][0], clones[i][1], 20, 20)
        }
        ctx.current.fillStyle='#9a031e'
        ctx.current.fillRect(food[0], food[1], 20, 20)
    }, [lizard, food]);
    
    const gameStart = () => {
        setLizard(initialLizard)
        setClones(initialClones)
        setFood(initialFood)
        setScore(0)
        setDirection([20,0])
        console.log(direction)
        setSpeed(initialSpeed)
        setGameIsLive(true)
        setGameOver(false)
        }
    
  
    const gameLoop = () => {
        setLizard([(lizard[0]+direction[0]),(lizard[1]+direction[1])])
        if (lizard[0]=== 400) {
            setLizard([0, (lizard[1])])
        }
        if ((lizard[0]+20)===0) {
            setLizard([380, (lizard[1])])
        }
        if (lizard[1]===400) {
            setLizard([lizard[0], 0])
        }
        if ((lizard[1]+20)===0) {
            setLizard([lizard[0], 380])
        }
        if (checkCollision(lizard, food)) {
            setScore(score+1)
            createFoodSpot()
            leaveClone()
        }
        for (let i = 0; i < clones.length; i++) {
            if (checkCollision(lizard, clones[i])){
                setGameOver(true)
            }
        }
        if (gameOver) {
            setDirection([0,0])
            setSpeed(null)
            setGameIsLive(false)
            addToken()
            setModalIsOpen(true)
            postScore()

        }
    }

    const checkCollision = (box1, box2) => {
        if (box1[0] === box2[0] && box1[1] === box2[1]) {
            console.log('collision detected')
            return true
        }
    }

    const changeDirection = (pressedKey) => {
        if (pressedKey.keyCode === 37){
            //move to the left
            setDirection([-20,0]);
        }
        if (pressedKey.keyCode === 38){
            //move up
            setDirection([0,-20]);
        }
        if (pressedKey.keyCode === 39){
            //move to the right   
            setDirection([20,0]);
        }
        if (pressedKey.keyCode === 40){
            //move down
            setDirection([0,20]);
        }
    }

    function createFoodSpot() {
        let tempfood= []
        
            tempfood = [Math.floor(Math.random() * (20))*20, 
                Math.floor(Math.random() * (20))*20]
   
        for (let i = 0; i < clones.length; i++) {
            let totalFood = tempfood[0] + tempfood[1]
            let totalClone = clones[i][0] + clones[i][1]
            console.log(totalFood)
            console.log(totalClone)
            if (totalFood == totalClone) {
                console.log("clone exists in food spot, changing location")
                
                tempfood =    [Math.floor(Math.random() * (20))*20, 
                    Math.floor(Math.random() * (20))*20]
                
            }
        }
        setFood(tempfood)
    }

    function leaveClone() {
        let cloneArray = [...clones]
        let newClone = lizard
        cloneArray.push(newClone)
        setClones(cloneArray)
    }

   
    return (
        <div className='gameContainer' role='button' tabIndex='0' onKeyDown={e => changeDirection(e)}>
             <h1 className='Title'>Lizard</h1>
             <h4 className='description'></h4>
            <canvas ref={canvas} className='canvas' width='400' height='400'></canvas>
            <div className='container1'>
                <button className='start' onClick={()=>{gameStart()}}>Start</button>
                <div className='score'>
                    <div className='scoreText'><strong>Score:</strong></div>
                    <div className='scoreNum'> {score} </div>
                </div>
            </div>
            <div className="modalContainer">
                <Modal className='modalContent' isOpen={modalIsOpen}>
                    <h1>GAME OVER</h1>
                    <h2>Your Score:   {score}</h2>
                    <h2>+1 Token!</h2>
                    <Link className='modalButton' to='/userprofile' > View Profile </Link>
                    <Link className='modalButton' to='/gamepage' onClick={()=>{setModalIsOpen(false)}}>Play Again?</Link>
                </Modal>
            </div>
        </div>
    )
}


export default Gamespace


  