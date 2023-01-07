import { useEffect, useState } from 'react'
import * as fcl from "@onflow/fcl"
// https://www.npmjs.com/package/@onflow/fcl-react/v/0.0.0
// import {useAccount, fmtFlow} from "@onflow/fcl-react"


export default function useCurrentUser() {
  const [user, setUser] = useState({loggedIn: null})
//   const [acct, refetchAcct] = useAccount(user.addr)

  const tools = {
    logIn: fcl.authenticate,
    logOut: fcl.unauthenticate
  }

  useEffect(() => {

    let cancel = false
    if (!cancel) {
      fcl.currentUser().subscribe(setUser)
    //   fcl.currentUser().subscribe(refetchAcct)
    }
    return () => {
      cancel = true
    }
  }, [])

//   return [user, acct, user?.addr != null, tools]
  return [user, user?.addr != null, tools]
}