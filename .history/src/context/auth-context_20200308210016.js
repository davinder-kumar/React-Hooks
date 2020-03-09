import React, { createContext, useState } from 'react'

const context = createContext({
    authenticated: false,
    login: () => { }
})



export const contextProvider = () => {
    const [isAuthenticated,setAuthenticated] = useState(false)
    const loginHandler = ()=>{
        setAuthenticated(true)
    }

    return <context.Provider value={{
        authenticated : isAuthenticated,
        login : loginHandler
    }}>

    </context.Provider>
}