import { useState, createContext } from 'react'

const UserContext = createContext()

const UserProvider = ({children}) => {

    const [userId, setUserId] = useState('')
    const [userInfo, setUserInfo] = useState('')
    const [color, setColor] = useState('#6FFFE9')

    const state = {
        userIdState: [userId, setUserId],
        userInfoState: [userInfo, setUserInfo],
        colorState: [color, setColor]
    }

    return (
        <div>
            <UserContext.Provider value={state}>
                {children}
            </UserContext.Provider>
        </div>
    )
}

export { UserContext, UserProvider }
