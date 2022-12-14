import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import LoadingBar from '../loadingBar/LoadingBar';

const UpdateProfile = () => {
    const [user, setUser] = useState({loggedIn: null})
    const [name, setName] = useState("")
    const [returnedProfileName, setReturnedProfileName] = useState("");
    const [inputProfileName, setInputProfileName] = useState("");
    const [transaction, setTransaction] = useState('') // NEW

    const [transactionStatus, setTransactionStatus] = useState(1) // NEW

    const [isLoading, setIsLoading] = useState(false) // NEW

    const [loading, setLoading] = useState({visible: false}) // NEW
    const [showError, setShowError] = useState(false) // NEW
    const [error, setError] = useState(null) // NEW
    // const [responseErrorDetails, setResponseErrorDetails] = useState('hello') // NEW

    // Needed to run Cadence functions including sendQuery, initAccount, executeTransaction
    useEffect(() => fcl.currentUser.subscribe(setUser), [])

    // [Query] Query Profile Name
    const sendQuery = async () => {
        setError(null)
        setLoading({visible: true})

        // Import Profile resource 0xProfile wallet passing Address as an input
        const profile = await fcl.query({
        cadence: `
            import Profile from 0xProfile

            pub fun main(address: Address): Profile.ReadOnly? {
            return Profile.read(address)
            }
        `,
        args: (arg, t) => [arg(user.addr, t.Address)]
        })
        setReturnedProfileName(profile?.name ?? 'No Profile')
        setLoading({visible: false})
    }

    const sendQueryThen = () => {
        setError(null)
        setShowError(false)
        setLoading({visible: true})

        fcl.query({
            cadence: `
                import Profile from 0xProfile
    
                pub fun main(address: Address): Profile.ReadOnly? {
                return Profile.read(address)
                }
            `,
            args: (arg, t) => [arg(user.addr, t.Address)]
            })
        .then(res => {
            setReturnedProfileName(res?.name ?? 'No Profile')
            setLoading({visible: false})
        })
        .catch(err => {
            setShowError(true)
            setError(err.message)
            setLoading({visible: false})
        })
    }

    const sendQueryThenError = () => {
        setError(null)
        setShowError(true)
        setLoading({visible: true})
        // Set Loading Variable
        setIsLoading(true)
        // Send query with bad profile 0xProfile => 0xBadProfile
        fcl.query({
            cadence: `
                import Profile from 0xBadProfile
    
                pub fun main(address: Address): Profile.ReadOnly? {
                return Profile.read(address)
                }
            `,
            args: (arg, t) => [arg(user.addr, t.Address)]
            })
        .then(res => {
            // This won't trigger because the request is bad
            setReturnedProfileName(res?.name ?? 'No Profile')
            // Set Loading Variable
            setLoading({visible: false})
        })
        .catch(err => {
            setShowError(true)
            setError(err.message)
            setLoading({visible: false})
        })
    }

    // [Mutate] Initialize Account 
    // For our ccount to have a profile, we need to create a resouce in our account youtube 18:00
    const initAccount = async () => {
        setError(null)
        setLoading({visible: true})
        const transactionId = await fcl.mutate({
        cadence: `
            import Profile from 0xProfile

            transaction {
            prepare(account: AuthAccount) {
                // Only initialize the account if it hasn't already been initialized
                if (!Profile.check(account.address)) {
                // This creates and stores the profile in the user's account
                account.save(<- Profile.new(), to: Profile.privatePath)

                // This creates the public capability that lets applications read the profile's info
                account.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
                }
            }
            }
        `,
        payer: fcl.authz,
        proposer: fcl.authz,
        authorizations: [fcl.authz],
        limit: 50
        })

        const transaction = await fcl.tx(transactionId).onceSealed()

        console.log(transaction)
        console.log(transaction.events[0]);
        console.log(transaction.events[0].transactionId);

        setTransaction(transaction.events[0].transactionId ?? 'No Profile')
        fcl.tx(transactionId).subscribe(res => setTransactionStatus(res.status))
        setLoading({visible: false})
    }

    // [Mutate] Mutate Profile name 
    const executeTransaction = async () => {

        setIsLoading(true);
        setTransactionStatus('step1')

        setError(null)
        setLoading({visible: true})
        const transactionId = await fcl.mutate({
        cadence: `
            import Profile from 0xProfile

            transaction(name: String) {
            prepare(account: AuthAccount) {
                account
                .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
                .setName(name)
            }
            }
        `,
        args: (arg, t) => [arg(inputProfileName, t.String)],
        // args: (arg, t) => [arg("Flow Developer!", t.String)],
        payer: fcl.authz,
        proposer: fcl.authz,
        authorizations: [fcl.authz],
        limit: 50
        })

        fcl.tx(transactionId).subscribe(res => setTransactionStatus(res.status))
        setLoading({visible: false})
    }

    return ( 
        <div className="updateProfile">
            
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                <div className="flex items-center">
                    <button onClick={sendQuery} type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Send Query</button>
                    <button onClick={sendQueryThen} type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Send Query</button>
                    <button onClick={sendQueryThenError} type="button" class="text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Request Error</button>
                    <button onClick={initAccount} type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Init Account</button>
                </div>
                <div className="flex items-center">
                    Profile: {returnedProfileName}
                </div>
            </div>

            
            <form onSubmit={executeTransaction}>
                <label for="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
                <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onChange={(e) => setInputProfileName(e.target.value)} type="search" id="search" name="search" placeholder="Search" required className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                {inputProfileName !== "" ? (
                    <button onClick={executeTransaction} type="button" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Profile Name</button>
                ) : "" }
                </div>
            </form>

            
            <br />
            {isLoading &&
                <LoadingBar observedStatus={transactionStatus} loadingType='flow-transaction' />
            }

            <br /><br />

            {transactionStatus && <div>{transactionStatus}</div> }
            {loading?.visible && <div>Loading ...</div> }
            { error &&
            <div>
                <br />
            <a href="#" class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Request Error
                </h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                {error}
                </p>
            </a>
            </div>
            }
    
        </div>
     );
}
 
export default UpdateProfile;

