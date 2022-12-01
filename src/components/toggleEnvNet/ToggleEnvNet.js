import * as fcl from "@onflow/fcl";
import { useState, useEffect } from "react";

const ToggleEnvNet = () => {
    
    const [user, setUser] = useState({loggedIn: null})
    const [environment, setEnvironment] = useState('mainnet') // NEW

    // Needed to run Cadence functions including sendQuery, initAccount, executeTransaction
    useEffect(() => fcl.currentUser.subscribe(setUser), [])
    
    useEffect(() => {
        console.log("Initializing Flow Environment");
        configureMainnet();
        // configureSandbox();
    }, [])


    const configureSandbox = () => {
        fcl.config()
            .put("flow.network", "testnet")
            .put("accessNode.api", "https://rest-testnet.onflow.org")
            .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")
            .put("0xBloctoWallet", "0x28546cc533227a74")      // https://flowscan.org/contract/0xfb3acf2dd1569a14
            .put("0xProfile", "0xba1132bc08f82fe2")           // https://testnet.flowscan.org/contract/A.ba1132bc08f82fe2.Profile
            // .put("app.detail.title", "Test Harness")
            // .put("app.detail.icon", "https://i.imgur.com/r23Zhvu.png")
            // .put("service.OpenID.scopes", "email email_verified name zoneinfo")
        
        // Update environment variable.
        setEnvironment('sandbox')
    }

    const configureMainnet = () => {
        fcl.config()
            .put("flow.network", "mainnet")
            .put("accessNode.api", "https://rest-mainnet.onflow.org")
            .put("discovery.wallet", "https://fcl-discovery.onflow.org/authn")
            .put("0xDapperWallet", "0x8c48176b31d2421d")      // https://flowscan.org/contract/0x8c48176b31d2421d
            .put("0xBloctoWallet", "0xfb3acf2dd1569a14")      // https://flowscan.org/contract/0xfb3acf2dd1569a14
            .put("0xAllDay", "0xe4cf4bdc1751c65d")            // https://flowscan.org/account/A.e4cf4bdc1751c65d.AllDay
            .put("0xPackNFT", "0xe4cf4bdc1751c65d")           // https://flowscan.org/contract/A.e4cf4bdc1751c65d.PackNFT
            .put("0xNonFungibleToken", "0x1d7e57aa55817448")  // https://flowscan.org/contract/A.1d7e57aa55817448.NonFungibleToken
            .put("0xMetadataViews", "0x1d7e57aa55817448")     // https://flowscan.org/contract/A.1d7e57aa55817448.MetadataViews
            .put("0xPDS", "0x44c6a6fd2281b6cc")               // https://flowscan.org/contract/A.44c6a6fd2281b6cc.PDS
            // .put("0xProfile", "0xba1132bc08f82fe2") 
            // .put("app.detail.title", "Test Harness")
            // .put("app.detail.icon", "https://i.imgur.com/r23Zhvu.png")
            // .put("service.OpenID.scopes", "email email_verified name zoneinfo")

        // Update environment variable.
        setEnvironment('mainnet');
    }

    const MainnetState = () => {
        const toggleSandbox = () => {
            // Log Out of FCL
            fcl.unauthenticate();
            // Configure Sandbox Environment
            configureSandbox();
            // Login with wallet in new environment
            fcl.signUp();
        }
        return (
          <div>
            <button onClick={toggleSandbox} type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2">Mainnet</button>
          </div>
        )
      }

  
    const SandboxState = () => {
        const toggleMainnet = () => {
            // Log Out of FCL
            fcl.unauthenticate()
            // Configure Mainnet Environment
            configureMainnet()
            // Login with wallet in new environment
            fcl.signUp();
        }
        return (
          <div>
            <button onClick={toggleMainnet} type="button" class="text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2">Sandbox</button>
          </div>
        )
      }

    return ( 
        <div className="toggleEnvNet flex items-center">
            {environment === 'mainnet'
            ? <MainnetState />
            : <SandboxState />
            }
        </div>
     );
}
 
export default ToggleEnvNet;