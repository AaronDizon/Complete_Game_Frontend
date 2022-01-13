import { useState, createContext } from 'react'

const UserContext = createContext()

const UserProvider = ({children}) => {

    const [userId, setUserId] = useState('')

    const state = {
        userState: [userId, setUserId]
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
