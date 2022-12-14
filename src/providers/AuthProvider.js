// https://github.com/bebner/crypto-dappy/blob/master/src/providers/AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react'

import useCurrentUser from '../hooks/use-current-user.hook'

const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, loggedIn, tools] = useCurrentUser()
    
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


  