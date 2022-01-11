import { useState, useEffect, useRef } from 'react'

const Gamespace = () => {

    const [score, setScore] = useState(0)

    const canvas = useRef();
    const ctx = useRef();
    useEffect(()=> {
        const context  = canvas.current.getContext('2d');
        ctx.current = context;
    });

    

    const head = {
        x: 0,
        y: 0,
        dx: 3,
        dy: 3,
    }
    
    let lizard =[];

    const food = {
        x: Math.floor(Math.random()*380) + 1,
        y: Math.floor(Math.random()*380) + 1,
    }

    // State Variables 

    let upId = 0;
    let rightId = 0;
    let leftId = 0;
    let downId = 0;
    let gameIsLive = false;
    let gameScore = 0;
    let foodX;
    let foodY;

    const gameStart = () => {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            gameIsLive = true;
            head.x = 0;
            head.y = 0;
            head.dx = 3;
            head.dy = 3;
        
            lizard = []
            setScore(0)
            //console.log(gameIsLive)
            
            if (gameIsLive === true){
                //console.log(`if true`)
                document.body.addEventListener('keydown', changeDirection);
        
            }
            if (gameIsLive === false){
                
            }
        }

    const drawlizard =() => {
        ctx.fillStyle='#6FFFE9';
        ctx.fillRect(head.x, head.y, 20, 20)
        ctx.fillStyle='white';

        for (let i = 0; i < lizard.length; i++){
            ctx.fillRect(lizard[i].x, lizard[i].y, 20, 20);
        }

    }

    function growBodyFromLeft(){
        const bodyPart = {
            x: head.x-21, 
            y: head.y,
      
        }
        lizard.push(bodyPart)
        //console.log(lizard)
     }
    function growBodyFromRight(){
        const bodyPart = {
            x: head.x+21, 
            y: head.y, 
     
        }
        lizard.push(bodyPart)
        //console.log(lizard)
     }
    function growBodyFromBelow(){
        const bodyPart = {
            x: head.x, 
            y: head.y+21, 
        }
        lizard.push(bodyPart)
        //console.log(lizard)
     }
    function growBodyFromAbove(){
        const bodyPart = {
            x: head.x, 
            y: head.y-21, 
        }
        lizard.push(bodyPart)
        //console.log(lizard)
     }
  

    const changeDirection = (pressedKey) => {
        if (pressedKey.keyCode === 37){
            //move to the left
            changedLeft()
        }
        if (pressedKey.keyCode === 38){
            //move up
            changedUp();
        }
        if (pressedKey.keyCode === 39){
            //move to the right   
            changedRight();
        }
        if (pressedKey.keyCode === 40){
            //move down
            changedDown()
        }
    }

    function createFoodSpot() {
        ctx.fillStyle='#9a031e'
        food.x = Math.floor(Math.random()*380) + 1
        food.y= Math.floor(Math.random()*380) + 1
        
    }
    function keepFood() {
        ctx.fillStyle='#9a031e'
        ctx.fillRect( food.x, food.y, 20, 20)
    }

    function checkGeneralCollision(head1, head2) {
        if((head1.x+20) >= head2.x && (head1.x+20) <= (head2.x+20) && head1.y >= head2.y && head1.y <= (head2.y+20) || 
        (head1.x+20) >= head2.x && (head1.x+20) <= (head2.x+20) && (head.y+20)>=head2.y && (head1.y+20) <= (head2.y+20) ||
        head1.x >= head2.x && head1.x <= (head2.x+20) && head1.y >= head2.y && head1.y <= (head2.y+20)||
        head1.x >= head2.x && head1.x <= (head2.x+20) && head1.y <= head2.y && (head1.y+20) >= (head2.y)
        ){
            return true;
        }
    }
    function changedRight() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        drawlizard();
        keepFood();
        head.x += head.dx;
        if (gameScore === 5){
            head.dx = 4;
            head.dy = 4; 
        }
        if (gameScore === 10){
            head.dx = 5;
            head.dy = 5; 
        }
        
        for (let i = 0; i < lizard.length; i++){
            if (checkGeneralCollision(head, lizard[i]) === true){
                gameIsLive = false;
                console.log(gameIsLive);
            }
        }
        if (checkGeneralCollision(head, food) === true){
            createFoodSpot()
            growBodyFromLeft()
            //SET THE SCORE HERE
        }
        if((head.x+20) >= canvas.width){
            head.x = 0;
        }
        noAcceleration();
    
        rightId = window.requestAnimationFrame(changedRight);
    
        if(gameIsLive === false) {
            cancelAnimationFrame(rightId)
            alert(`game over`);
            document.body.removeEventListener('keydown', changeDirection )
            //CONDITIONALLY RENDER THE ONCLICK FOR START BUTTON
        }
    }
    function changedUp() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        drawlizard();    
        keepFood();
        head.y += -head.dy;
        if (gameScore === 5){
            head.dx = 4;
            head.dy = 4; 
        }
        if (gameScore === 10){
            head.dx = 5;
            head.dy = 5; 
        }
        for (let i = 0; i < lizard.length; i++){
            if (checkGeneralCollision(head, lizard[i]) === true){
                gameIsLive = false;
                console.log(gameIsLive);
            }
        }
        if (checkGeneralCollision(head, food) === true){
            createFoodSpot()
            growBodyFromBelow()
            //SET THE SCORE HERE
        }   
        if(head.y <= 0) {
            head.y = canvas.height-20;
        }
        noAcceleration();
    
        upId = window.requestAnimationFrame(changedUp);
    
        if(gameIsLive === false) {
            cancelAnimationFrame(upId)
            alert(`game over`);
            document.body.removeEventListener('keydown', changeDirection )
            //CONDITIONALLY RENDER THE ONCLICK FOR START BUTTON
        }
        
    }
    function changedLeft() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        drawlizard();    
        keepFood();
        head.x += -head.dx;
        if (gameScore === 5){
            head.dx = 4;
            head.dy = 4; 
        }
        if (gameScore === 10){
            head.dx = 5;
            head.dy = 5; 
        }
        for (let i = 0; i < lizard.length; i++){
            if (checkGeneralCollision(head, lizard[i]) === true){
                gameIsLive = false;
                console.log(gameIsLive);
            }
        }
        
        if (checkGeneralCollision(head, food) === true){
            createFoodSpot()
            growBodyFromRight()
            //SET THE SCORE HERE
        }    
        if(head.x <= 0) {
            head.x = canvas.width-20;
        }
        noAcceleration();
    
        leftId = window.requestAnimationFrame(changedLeft);
    
        if(gameIsLive === false) {
            cancelAnimationFrame(leftId)
            alert(`game over`);
            document.body.removeEventListener('keydown', changeDirection )
            //CONDITIONALLY RENDER THE ONCLICK FOR START BUTTON
        }
    }
    function changedDown() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        drawlizard();
        keepFood();
        head.y += head.dy;
        if (gameScore === 5){
            head.dx = 4;
            head.dy = 4; 
        }
        if (gameScore === 10){
            head.dx = 5;
            head.dy = 5; 
        }
        for (let i = 0; i < lizard.length; i++){
            if (checkGeneralCollision(head, lizard[i]) === true){
                gameIsLive = false;
                console.log(gameIsLive);
            }
        }
        if (checkGeneralCollision(head, food) === true){
            createFoodSpot()
            growBodyFromAbove()
            //SET THE SCORE HERE
            
        }
        if((head.y+20) >= canvas.height) {
            head.y = 0;
        }
        noAcceleration();
    
        downId = window.requestAnimationFrame(changedDown);
    
        if(gameIsLive === false) {
            cancelAnimationFrame(downId)
            alert(`game over`);
            document.body.removeEventListener('keydown', changeDirection )
            //CONDITIONALLY RENDER THE ONCLICK FOR START BUTTON
        }
    }
    
    function noAcceleration() {
        if(leftId !== 0){
            cancelAnimationFrame(leftId)
        }
        if(upId !== 0){
            cancelAnimationFrame(upId)
        }
        if(rightId !== 0){
            cancelAnimationFrame(rightId)
        }
        if(downId !== 0){
            cancelAnimationFrame(downId)
        }
    }
    

    return (
        <div className='gameContainer'>
             <h1 className='Title'>Lizard</h1>
             <h4 className='description'></h4>
            <canvas ref= {canvas} className='canvas' width='400' height='400'></canvas>
            <div className='container1'>
                <button className='start'>Start</button>
                <div className='score'>
                    <div className='scoreText'><strong>Score:</strong></div>
                    <div className='scoreNum'></div>
                </div>
            </div>
        </div>
    )
}

export default Gamespace
