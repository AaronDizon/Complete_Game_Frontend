import { useState, createContext } from 'react'

const UserContext = createContext()

const UserProvider = ({children}) => {

    const [user, setUser] = useState('')

    const state = {
        userState: [user, setUser]
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
