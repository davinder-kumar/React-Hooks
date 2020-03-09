import React, { createContext, useState } from 'react'

export const context = createContext({
    authenticated: false,
    login: () => { }
})



export const ontextProvider = (props) => {
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