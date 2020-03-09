import React, { createContext, useState } from 'react'

const context = createContext({
    authenticated: false,
    login: () => { }
})



export const contextProvider = (props) => {
    const [isAuthenticated,setAuthenticated] = useState(false)
    const loginHandler = ()=>{
        setAuthenticated(true)
    }

    return <context.Provider value={{
        authenticated : isAuthenticated,
        login : loginHandler
    }}>
        {props.children}
    </context.Provider>
}