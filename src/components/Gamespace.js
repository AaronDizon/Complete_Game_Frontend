import { useState, useEffect, useRef } from 'react'
import { useInterval }from './useInterval'

const Gamespace = () => {

    const initialLizard = [0,0]
    const initialClones = []
    const initialFood = [200, 200]
    const initialSpeed = 100

    const [score, setScore] = useState(0)
    const [gameIsLive, setGameIsLive] = useState(false)
    const [direction, setDirection] = useState([0,0])
    const [lizard, setLizard] = useState(initialLizard)
    const [food, setFood] = useState(initialFood)
    const [speed, setSpeed] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    useInterval(()=> gameLoop(), speed);

    const canvas = useRef();
    const ctx = useRef();
    useEffect(()=> {
        const context  = canvas.current.getContext('2d');
        ctx.current = context;
        ctx.current.clearRect(0,0, canvas.current.width, canvas.current.height)
        ctx.current.fillStyle='#6FFFE9'
        ctx.current.fillRect(lizard[0], lizard[1], 20, 20)
        ctx.current.fillStyle='#9a031e'
        ctx.current.fillRect(food[0], food[1], 20, 20)
    }, [lizard, food]);

    // console.log(ctx)
    // console.log(food)
    // console.log(direction)
    
    const gameStart = () => {
        setDirection([20,0])
        console.log(direction)
        setSpeed(initialSpeed)
        setGameIsLive(true)
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
            createFoodSpot()
        }
    }

    const checkCollision = (box1, box2) => {
        if (box1[0] === box2[0] && box1[1] === box2[1]) {
            console.log('collision detected')
            return true
        }
    }

    // const drawlizard =() => {
    //     ctx.current.fillStyle='#6FFFE9';
    //     ctx.current.fillRect(head.x, head.y, 20, 20)
    //     ctx.current.fillStyle='white';

    //     for (let i = 0; i < lizard.length; i++){
    //         ctx.current.fillRect(lizard[i].x, lizard[i].y, 20, 20);
    //     }

    // }

    // function growBodyFromLeft(){
    //     const bodyPart = {
    //         x: head.x-21, 
    //         y: head.y,
      
    //     }
    //     lizard.push(bodyPart)
    //     console.log(lizard)
    //  }
    // function growBodyFromRight(){
    //     const bodyPart = {
    //         x: head.x+21, 
    //         y: head.y, 
     
    //     }
    //     lizard.push(bodyPart)
    //     //console.log(lizard)
    //  }
    // function growBodyFromBelow(){
    //     const bodyPart = {
    //         x: head.x, 
    //         y: head.y+21, 
    //     }
    //     lizard.push(bodyPart)
    //     //console.log(lizard)
    //  }
    // function growBodyFromAbove(){
    //     const bodyPart = {
    //         x: head.x, 
    //         y: head.y-21, 
    //     }
    //     lizard.push(bodyPart)
    //     //console.log(lizard)
    //  }
  

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
                [
                    // (Math.floor(Math.random()*20)), 
                    // (Math.floor(Math.random()*20))
                    Math.floor(Math.random() * (20))*20,
                    Math.floor(Math.random() * (20))*20
                ]
            
            )

        
        
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
        </div>
    )
}


export default Gamespace


    // let head = {
    //     x: 0,
    //     y: 0,
    //     dx: 3,
    //     dy: 3,
    // } 

  // // State Variables 

    // let upId = 0;
    // let rightId = 0;
    // let leftId = 0;
    // let downId = 0;
    // let gameScore = 0;

// function checkGeneralCollision(head1, head2) {
//     if((head1.x+20) >= head2.x && (head1.x+20) <= (head2.x+20) && head1.y >= head2.y && head1.y <= (head2.y+20) || 
//     (head1.x+20) >= head2.x && (head1.x+20) <= (head2.x+20) && (head.y+20)>=head2.y && (head1.y+20) <= (head2.y+20) ||
//     head1.x >= head2.x && head1.x <= (head2.x+20) && head1.y >= head2.y && head1.y <= (head2.y+20)||
//     head1.x >= head2.x && head1.x <= (head2.x+20) && head1.y <= head2.y && (head1.y+20) >= (head2.y)
//     ){
//         return true;
//     }
// }
// function changedRight() {
//     ctx.current.clearRect(0,0, canvas.current.width, canvas.current.height);
//     drawlizard();
//     keepFood();
//     setLizardX(lizardX += head.dx);
//     if (gameScore === 5){
//         head.dx = 4;
//         head.dy = 4; 
//     }
//     if (gameScore === 10){
//         head.dx = 5;
//         head.dy = 5; 
//     }
    
//     for (let i = 0; i < lizard.length; i++){
//         if (checkGeneralCollision(head, lizard[i]) === true){
//             setGameIsLive(false);
//             console.log(gameIsLive);
//         }
//     }
//     if (checkGeneralCollision(head, food) === true){
//         createFoodSpot()
//         growBodyFromLeft()
//         //SET THE SCORE HERE
//         setScore(score+1)
//     }
//     if((head.x+20) >= canvas.current.width){
//         head.x = 0;
//     }
//     noAcceleration();

//     rightId = window.requestAnimationFrame(changedRight);

//     if(gameIsLive === false) {
//         cancelAnimationFrame(rightId)
//         alert(`game over`);
//         document.body.removeEventListener('keydown', changeDirection )
//         //CONDITIONALLY RENDER THE ONCLICK FOR START BUTTON
//     }
// }
// function changedUp() {
//     ctx.current.clearRect(0,0, canvas.current.width, canvas.current.height);
//     drawlizard();    
//     keepFood();
//     head.y += -head.dy;
//     if (gameScore === 5){
//         head.dx = 4;
//         head.dy = 4; 
//     }
//     if (gameScore === 10){
//         head.dx = 5;
//         head.dy = 5; 
//     }
//     for (let i = 0; i < lizard.length; i++){
//         if (checkGeneralCollision(head, lizard[i]) === true){
//             gameIsLive(false);
//             console.log(gameIsLive);
//         }
//     }
//     if (checkGeneralCollision(head, food) === true){
//         createFoodSpot()
//         growBodyFromBelow()
//         //SET THE SCORE HERE
//         setScore(score+1)
//     }   
//     if(head.y <= 0) {
//         head.y = canvas.current.height-20;
//     }
//     noAcceleration();

//     upId = window.requestAnimationFrame(changedUp);

//     if(gameIsLive === false) {
//         cancelAnimationFrame(upId)
//         alert(`game over`);
//         document.body.removeEventListener('keydown', changeDirection )
//         //CONDITIONALLY RENDER THE ONCLICK FOR START BUTTON
//     }
    
// }
// function changedLeft() {
//     ctx.current.clearRect(0,0, canvas.current.width, canvas.current.height);
//     drawlizard();    
//     keepFood();
//     head.x += -head.dx;
//     if (score === 5){
//         head.dx = 4;
//         head.dy = 4; 
//     }
//     if (score === 10){
//         head.dx = 5;
//         head.dy = 5; 
//     }
//     for (let i = 0; i < lizard.length; i++){
//         if (checkGeneralCollision(head, lizard[i]) === true){
//             setGameIsLive(false);
//             console.log(gameIsLive);
//         }
//     }
    
//     if (checkGeneralCollision(head, food) === true){
//         createFoodSpot()
//         growBodyFromRight()
//         //SET THE SCORE HERE
//         setScore(score+1)
//     }    
//     if(head.x <= 0) {
//         head.x = canvas.current.width-20;
//     }
//     noAcceleration();

//     leftId = window.requestAnimationFrame(changedLeft);

//     if(gameIsLive === false) {
//         cancelAnimationFrame(leftId)
//         alert(`game over`);
//         document.body.removeEventListener('keydown', changeDirection )
//         //CONDITIONALLY RENDER THE ONCLICK FOR START BUTTON
//     }
// }
// function changedDown() {
//     ctx.current.clearRect(0,0, canvas.current.width, canvas.current.height);
//     drawlizard();
//     keepFood();
//     head.y += head.dy;
//     if (gameScore === 5){
//         head.dx = 4;
//         head.dy = 4; 
//     }
//     if (gameScore === 10){
//         head.dx = 5;
//         head.dy = 5; 
//     }
//     for (let i = 0; i < lizard.length; i++){
//         if (checkGeneralCollision(head, lizard[i]) === true){
//             setGameIsLive(false);
//             console.log(gameIsLive);
//         }
//     }
//     if (checkGeneralCollision(head, food) === true){
//         createFoodSpot()
//         growBodyFromAbove()
//         //SET THE SCORE HERE
//         setScore(score+1)
        
//     }
//     if((head.y+20) >= canvas.current.height) {
//         head.y = 0;
//     }
//     noAcceleration();

//     downId = window.requestAnimationFrame(changedDown);

//     if(gameIsLive === false) {
//         cancelAnimationFrame(downId)
//         alert(`game over`);
//         document.body.removeEventListener('keydown', changeDirection )
//         //CONDITIONALLY RENDER THE ONCLICK FOR START BUTTON
//     }
// }

// function noAcceleration() {
//     if(leftId !== 0){
//         cancelAnimationFrame(leftId)
//     }
//     if(upId !== 0){
//         cancelAnimationFrame(upId)
//     }
//     if(rightId !== 0){
//         cancelAnimationFrame(rightId)
//     }
//     if(downId !== 0){
//         cancelAnimationFrame(downId)
//     }
// }
