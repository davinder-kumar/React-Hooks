import React, { createContext } from 'react'

const context = createContext({
    authenticated: false,
    login: () => { }
})



const contextProvider = () => {

    const loginHandler = ()=>{
        
    }

    return <context.Provider login>

    </context.Provider>
}