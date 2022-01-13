import { useState, createContext } from 'react'

const UserContext = createContext()

const UserProvider = ({children}) => {

    const [userId, setUserId] = useState('')
    const [userInfo, setUserInfo] = useState('')

    const state = {
        userIdState: [userId, setUserId],
        userInfoState: [userInfo, setUserInfo]
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
