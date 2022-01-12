import { useState }from 'react'
import Modal from 'react-modal'
import Gamespace from '../components/Gamespace'
import Navbar from '../components/Navbar'

const Gamepage = (props) => {
    
    
    
    return (
        <div>
            <Navbar />
            <Gamespace setGameState={props.setGameState} />
            
        </div>
    )
}

export default Gamepage
