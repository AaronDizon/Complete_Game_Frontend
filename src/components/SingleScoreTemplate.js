import React from 'react'

const SingleScoreTemplate = (props) => {
    return (
        <div className='scoreRow'>
            <div>
            <p>{props.score.user.username}</p>

            </div>
            <div>
            <p>{props.score.score}</p>

            </div>
            <div>
            <p>{props.score.date}</p>

            </div>
        </div>
    )
}

export default SingleScoreTemplate
