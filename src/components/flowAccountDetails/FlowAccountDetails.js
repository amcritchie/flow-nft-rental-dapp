import * as fcl from "@onflow/fcl"
import {useCurrentUser, useAccount, fmtFlow, useConfig} from "@onflow/fcl-react"

const Sandbox = () => {
    const env = useConfig("env")
    const accessNode = useConfig("accessNode.api")
    const walletDiscovery = useConfig("challenge.handshake")
    const [user] = useCurrentUser()
    const [acct, refetchAcct] = useAccount(user.addr)

    // prettier-ignore
    if (acct == null) return <div>Loading Account...</div>

    return (
        <div>
            <h3>General Info</h3>
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
 
export default Sandbox;
