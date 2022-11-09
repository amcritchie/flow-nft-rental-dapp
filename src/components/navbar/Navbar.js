import * as fcl from "@onflow/fcl";
import {useCurrentUser, useAccount, fmtFlow} from "@onflow/fcl-react"

import "../../flow/config";
import logo from '../../assets/logo.svg';
import flowLogo from '../../assets/flowLogo.png';
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Navbar = () => {
    const [user, setUser] = useState({loggedIn: null})
    const [name, setName] = useState('') // NEW
    const [acct, refetchAcct] = useAccount(user.addr)
    const [flowBalance, setFlowBalance] = useState(0)

    // Run hook only on load.  Dependancy [] 
    useEffect(() => fcl.currentUser.subscribe(setUser), [])
    // useEffect(() => fcl.currentUser.subscribe(refetchAcct), [])

    // Run hook when user state changes.  Dependancy [user]
    useEffect(() => {
      console.log('Web3 3 user state change===|');
      console.log(user);
      console.log('Account balance============|');
      console.log(acct?.balance);
      console.log('Account balance2===========|');
      console.log(acct?.balance);
      console.log('===========================|');
    }, [user]);
  
    const AuthedState = () => {
        return (
          <div>
            <a className="mr-3 text-sm font-medium text-gray-500 dark:text-white hover:underline">
              {acct?.balance / 100000000 ?? 0}
              <img src={flowLogo} className="h-4 w-4 mx-1 mb-1 inline" alt="logo" />
            </a>
            <a href={ 'https://testnet.flowscan.org/account/' + user?.addr } target="_blank" className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">
              {user?.addr ?? "No Address"}
              </a>
              <a onClick={fcl.unauthenticate} className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Log Out</a>
          </div>
        )
      }

    const UnauthenticatedState = () => {
        return (
          <div>
            <a onClick={fcl.signUp} className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">Login</a>
          </div>
        )
      }

    return ( 
        <div>
        <nav className="navbar bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                <a to="/" className="flex items-center">
                  <img src={logo} className="xx-App-logo h-8 w-8" alt="logo" />
                  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">NFT Rentals</span>
                </a>
                <div className="flex items-center">
                  {user.loggedIn
                    ? <AuthedState />
                    : <UnauthenticatedState />
                  }
                </div>
            </div>
        </nav>
        <nav className="bg-gray-50 dark:bg-gray-700">
            <div className="py-3 px-4 mx-auto max-w-screen-xl md:px-6">
                <div className="flex items-center">
                    <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                        <li>
                          <Link to={'/'}>
                            <a className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
                          </Link>
                        </li>
                        <li>
                          <Link to={'/updateProfile'}>
                            <a className="text-gray-900 dark:text-white hover:underline" aria-current="page">Profile</a>
                          </Link>
                        </li>
                        <li>
                          <Link to={'/flowAccountDetails'}>
                            <a className="text-gray-900 dark:text-white hover:underline" aria-current="page">Flow Account</a>
                          </Link>
                        </li>
                        <li>
                          <Link to={'/interact'}>
                            <a className="text-gray-900 dark:text-white hover:underline" aria-current="page">Interact</a>
                          </Link>
                        </li>
                        <li>
                          <Link to={'/legacy'}>
                            <a className="text-gray-900 dark:text-white hover:underline" aria-current="page">Legacy</a>
                          </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
      </div>
     );
}
 
export default Navbar;