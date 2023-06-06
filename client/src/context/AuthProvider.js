import {createContext, useState, useContext} from 'react'

const AuthContext = createContext({});

export const useAuth = () => {
    const {auth} = useContext(AuthContext)
    return useContext(AuthContext)
    }

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
        {children}
        </AuthContext.Provider>
    )
}
