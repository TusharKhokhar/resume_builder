import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const AuthContext = createContext({
    token: '',
    isLogin: false,
    login: (token) => { },
    logout: () => { }
})

const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken)
    const isLogIn = !!token

    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('token',token)
    }

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
    }

    const contextValue = {
        token: token,
        isLogin: isLogIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return (
        <AuthContext.Provider value={contextValue }>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider