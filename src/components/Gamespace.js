import { useState, useEffect, useRef } from 'react'

const Gamespace = () => {

    const [score, setScore] = useState(0)

    const canvas = useRef();
    const contextRef = useRef();
    useEffect(()=> {
        const context  = canvas.current.getContext('2d');
        contextRef.current = context;
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
            contextRef.clearRect(0,0, canvas.width, canvas.height);
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
                start.removeEventListener('click', gameStart)
                drawlizard()
               
        
            }
            if (gameIsLive === false){
                
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
