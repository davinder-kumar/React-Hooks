import React, { createContext } from 'react'

const context = createContext({
    authenticated: false,
    login : ()=>{} 
})

const contextProvider = () =>(
    <context.Provider
)