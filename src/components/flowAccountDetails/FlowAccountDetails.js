// https://www.npmjs.com/package/@onflow/fcl-react/v/0.0.0
// import * as fcl from "@onflow/fcl"
// import {useCurrentUser, useAccount, fmtFlow, useConfig} from "@onflow/fcl-react"

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
// import {useScript, useCurrentUser} from "@onflow/fcl-react"
import {useScript, useCurrentUser, useAccount, fmtFlow, useConfig} from "@onflow/fcl-react"
import {useEffect, useCallback} from "react"

// prettier-ignore
// fcl.config()
//   .put("env", "testnet")
//   .put("0xProfile", "0x1d007d755706c469")

const FlowAccountDetails = () => {
    const env = useConfig("env")
    const accessNode = useConfig("accessNode.api")
    const walletDiscovery = useConfig("challenge.handshake")
    const [user] = useCurrentUser()
    const [acct, refetchAcct] = useAccount(user.addr)

    // const [user] = useCurrentUser()
    const [exec, profile] = useScript([
      fcl.script`
        import Profile from 0xProfile
  
        pub fun main(address: Address): Profile.ReadOnly? {
          return Profile.fetchProfile(address)
        }
      `
    ])


    // fetch the profile if there is a current user
    useEffect(() => {
        // prettier-ignore
        if (user.addr) exec([
        fcl.arg(user.addr, t.Address)
        ])
    }, [user.addr])

    // fetch the profile as needed (if there is a current user)
    const triggerScript = useCallback(() => {
        // prettier-ignore
        if (user.addr) exec([
        fcl.arg(user.addr, t.Address)
        ])
    }, [user.addr])


    // prettier-ignore
    if (acct == null) return <div>Loading Account...</div>

    return (
        <div>
            <h3>General Info</h3>
            <ul>
                <li>
                    <button onClick={triggerScript}>Refresh Profile</button>
                </li>
            </ul>
            <ul>
                <li>ENV:  <b>{env}</b></li>
                <li>Access Node: <b>{accessNode}</b></li>
                <li>Wallet Discovery:  <b>{walletDiscovery}</b></li>
            </ul>
            <ul>
                <li>Address:  <b>{fcl.display(acct.address)}</b></li>
                <li>Balance:  <b>{fmtFlow(acct.balance)}</b></li>
            </ul>
            <h3>Keys</h3>
            <ul>
                {acct.keys.map(key => (
                <li>
                    <pre key={key.index}>{JSON.stringify(key, null, 2)}</pre>
                </li>
                ))}
            </ul>
            <h3>Code</h3>
            <pre>{acct.code}</pre>
        </div>
    )
}
 
export default FlowAccountDetails;
