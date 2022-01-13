import { useState, useEffect, useContext, useRef } from 'react';
import Modal from 'react-modal';
import { useInterval }from './useInterval';
import { UserContext } from '../context/UserContext'
import  axios  from 'axios';
import env from 'react-dotenv';

const Gamespace = (props) => {

    const { userState } = useContext(UserContext)
    const [ userId, setUserId ] = userState

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
    console.log(userId)

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





//----------------------------Game Logic----------------------------

    

    useInterval(()=> gameLoop(), speed);

    const canvas = useRef();
    const ctx = useRef();
    useEffect(()=> {
        const context  = canvas.current.getContext('2d');
        ctx.current = context;
        ctx.current.clearRect(0,0, canvas.current.width, canvas.current.height)
        ctx.current.fillStyle='#6FFFE9'
        ctx.current.fillRect(lizard[0], lizard[1], 20, 20)
        ctx.current.fillStyle='white'
        for (let i = 0; i < clones.length; i++){
            ctx.current.fillRect(clones[i][0], clones[i][1], 20, 20)
        }
        ctx.current.fillStyle='#9a031e'
        ctx.current.fillRect(food[0], food[1], 20, 20)
    }, [lizard, food]);

    // console.log(ctx)
    // console.log(food)
    // console.log(direction)
    
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
    
    const stopGame = () => {
        setDirection([0,0])
        setSpeed(null)
        setGameIsLive(false)
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
        setFood(
                [Math.floor(Math.random() * (20))*20, 
                Math.floor(Math.random() * (20))*20]
            )
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
                <Modal className='modal' isOpen={modalIsOpen}>
                    <h1>GAME OVER</h1>
                    <h2>Your Score:   {score}</h2>
                    <button className='start' onClick={()=>{setModalIsOpen(false)}}>Play Again?</button>
                </Modal>
            </div>
        </div>
    )
}


export default Gamespace


  