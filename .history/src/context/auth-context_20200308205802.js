import React, { createContext } from 'react'

const context = createContext({
    authenticated: false,
    login : ()=>{} 
})

const contextProvider = () =>{
    return <context.Provider></context.Provider>
}