import * as fcl from "@onflow/fcl"
import {useCurrentUser, useAccount, fmtFlow} from "@onflow/fcl-react"

const Sandbox = () => {
    const [user] = useCurrentUser()
    const [acct, refetchAcct] = useAccount(user.addr)
  
    // prettier-ignore
    if (acct == null) return <div>Loading Account...</div>
  
    return (
      <div>
        <h3>General Info</h3>
        <ul>
          <li>Address: {fcl.display(acct.address)}</li>
          <li>Balance: {fmtFlow(acct.balance)}</li>
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
