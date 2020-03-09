import React, { createContext, useState } from 'react'

export const context = createContext({
    authenticated: false,
    login: () => { }
})



export const contextProvider = (props) => {
    const [isAuthenticated,setAuthenticated] = useState(false)
    

    return <context.Provider value={{
        authenticated : isAuthenticated,
        login : loginHandler
    }}>
        {props.children}
    </context.Provider>
}