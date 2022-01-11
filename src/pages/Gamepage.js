import { useState }from 'react'
import Modal from 'react-modal'
import Gamespace from '../components/Gamespace'

const Gamepage = (props) => {
    
    
    
    return (
        <div>
            <Gamespace setGameState={props.setGameState} />
            
        </div>
    )
}

export default Gamepage
