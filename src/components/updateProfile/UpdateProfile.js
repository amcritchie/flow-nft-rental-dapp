import "../../flow/config";

import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";

const UpdateProfile = () => {
    const [user, setUser] = useState({loggedIn: null})
    const [name, setName] = useState("")
    const [returnedProfileName, setReturnedProfileName] = useState("");
    const [inputProfileName, setInputProfileName] = useState("");
    const [transaction, setTransaction] = useState('') // NEW

    const [transactionStatus, setTransactionStatus] = useState(1) // NEW

    const [isLoading, setIsLoading] = useState(false) // NEW
    const [flowTransationStatus, setFlowTransationStatus] = useState("Pending") // NEW
    const [flowTransationLastEvent, setFlowTransationLastEvent] = useState("Pending") // NEW
    const [flowTransationProgress, setFlowTransationProgress] = useState("15%") // NEW
    const [flowTransationProgressColorClass, setFlowTransationProgressColorClass] = useState("bg-green-600 text-green-100")

    const [loading, setLoading] = useState({visible: false}) // NEW
    const [showError, setShowError] = useState(false) // NEW
    const [error, setError] = useState(null) // NEW
    // const [responseErrorDetails, setResponseErrorDetails] = useState('hello') // NEW

    const [flowTransactionStatus, setFlowTransactionStatus] = useState({
       '0': {status: 'unkown', progress_percent: 10, color: 'yellow', description: 'The transaction status is not known.'},
       '1': {status: 'pending', progress_percent: 25, color: 'green', description: 'The transaction has been received by a collector but not yet finalized in a block.'},
       '2': {status: 'finalized', progress_percent: 50, color: 'green', description: 'The consensus nodes have finalized the block that the transaction is included in.'},
       '3': {status: 'executed', progress_percent: 75, color: 'green', description: 'The execution nodes have produced a result for the transation.'},
       '4': {status: 'sealed', progress_percent: 100, color: 'blue', description: 'The verification nodes have verified the transaction (the block in which the transaction is) and the seal is included in the latest block.'},
       '5': {status: 'expired', progress_percent: 90, color: 'red', description: 'The transaction we submitted past its expiration.'}
    });

    // Run hook when user state changes.  Dependancy [user]
    useEffect(() => {
        console.log('Transaction Status Updated');
        console.log('New Transaction Status: ' + transactionStatus);
        console.log('===========================|');

        switch (transactionStatus) {
            case 0:
                // The transaction status is not known.
                setFlowTransationStatus("Unkown");
                setFlowTransationLastEvent("Unkown");
                setFlowTransationProgress("15%");
                setFlowTransationProgressColorClass("bg-red-600 text-red-100");
              break;
            case '1':
                // The transaction has been received by a collector but not yet finalized in a block.
                setFlowTransationStatus("Pending");
                setFlowTransationLastEvent("Pending");
                setFlowTransationProgress("35%");
                setFlowTransationProgressColorClass("bg-green-600 text-green-100");
              break;
            case 2:
                // The consensus nodes have finalized the block that the transaction is included in.
                setFlowTransationStatus("Finalized");
                setFlowTransationLastEvent("Finalized");
                setFlowTransationProgress("50%");
                setFlowTransationProgressColorClass("bg-green-600 text-green-100");
              break;
            case 3:
                 // The execution nodes have produced a result for the transation.
                setFlowTransationStatus("Executed");
                setFlowTransationLastEvent("Executed");
                setFlowTransationProgress("75%");
                setFlowTransationProgressColorClass("bg-green-600 text-green-100");
              break;
            case 4:
                // The verification nodes have verified the transaction (the block in which the transaction is) and the seal is included in the latest block.
                setFlowTransationStatus("Sealed");
                setFlowTransationLastEvent("Sealed");
                setFlowTransationProgress("100%");
                setFlowTransationProgressColorClass("bg-blue-600 text-blue-100");
              break;
            case 5:
                // The transaction we submitted past its expiration.
                setFlowTransationStatus("Expired");
                setFlowTransationLastEvent("Expired");
                setFlowTransationProgress("100%");
                setFlowTransationProgressColorClass("bg-red-600 text-blredue-100");
              break;
            default:
                setFlowTransationStatus("Pending");
                setFlowTransationLastEvent("Pending");
                setFlowTransationProgress("15%");
                setFlowTransationProgressColorClass("bg-green-600 text-green-100");
          }
    }, [transactionStatus]);

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
        setFlowTransationStatus("Pending");
        setFlowTransationLastEvent("Pending");
        setFlowTransationProgress("15%");
        setFlowTransationProgressColorClass("bg-green-600 text-green-100");

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
                <div>
                    <div class="mb-1 text-lg font-medium dark:text-black">{flowTransationStatus}</div>
                    <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                        <div className={'h-6 text-l font-medium text-right pr-4 p-0.5 leading-none rounded-full ' + flowTransationProgressColorClass} style={{ width: flowTransationProgress}}>{flowTransationLastEvent}</div>
                    </div>
                </div>
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

