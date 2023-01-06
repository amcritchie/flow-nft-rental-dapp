import React, { createContext, useContext, useEffect, useState } from 'react'
import * as fcl from "@onflow/fcl"

// import useCurrentUser from '../hooks/use-current-user.hook'
// import useCurrentUser from '../hooks/UseCurrentUser'
// import Header from '../components/Header'

const AuthContext = createContext()

// AuthProvider
// https://github.com/bebner/crypto-dappy/blob/master/src/providers/AuthProvider.js
// use-current-user.hook
// https://github.com/bebner/crypto-dappy/blob/9ad2d82b514cb62326471fb17a39540e93dc56e6/src/hooks/use-current-user.hook.js

export default function AuthProvider({ children }) {
    const [user, setUser] = useState()

    const tools = {
        logIn: fcl.authenticate,
        logOut: fcl.unauthenticate,
    }

    useEffect(() => {
        let cancel = false
        if (!cancel) {
        fcl.currentUser().subscribe(setUser)
        }
        return () => {
        cancel = true
        }
    }, [])

    let loggedIn = user?.addr != null
    
    return (
      <AuthContext.Provider value={{
        user,
        loggedIn,
        ...tools
      }}>
        {children}
      </AuthContext.Provider>
    )
  }
  
  export const useAuth = () => {
    return useContext(AuthContext)
  }