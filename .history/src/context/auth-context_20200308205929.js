import React, { createContext, useState } from 'react'

const context = createContext({
    authenticated: false,
    login: () => { }
})



const contextProvider = () => {
    const [isAuthenticated,setAuthenticated] = useState(false)
    const loginHandler = ()=>{

    }

    return <context.Provider login>

    </context.Provider>
}