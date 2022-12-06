import * as fcl from "@onflow/fcl";
import {useCurrentUser, useAccount, fmtFlow} from "@onflow/fcl-react"

import logo from '../../assets/logo.svg';
import flowLogo from '../../assets/flowLogo.png';
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import ToggleEnvNet from '../toggleEnvNet/ToggleEnvNet';

const Navbar = ({sidebarOpen, setSidebarOpen}) => {
    const [user, setUser] = useState({loggedIn: null})
    const [name, setName] = useState('') // NEW
    const [acct, refetchAcct] = useAccount(user.addr)
    const [flowBalance, setFlowBalance] = useState(0)
    // const [open, setOpen] = useState(false);
    // const [open, setOpen] = useState(false);

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
          { acct?.balance && // Load Flow balance when ready.
          <a className="mr-3 text-sm font-medium text-gray-500 dark:text-white hover:underline">
            {acct?.balance / 100000000 ?? 0}
            <img src={flowLogo} className="h-4 w-4 mx-1 mb-1 inline" alt="logo" />
          </a>
          }
          { user?.addr && // Load Flow wallet when ready.
            <div className="inline">
              <a href={ 'https://testnet.flowscan.org/account/' + user?.addr } target="_blank" className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">
                {user?.addr}
              </a>
              <a onClick={fcl.unauthenticate} className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Log Out</a>
            </div>
          }
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
            
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button>
                <a to="/" className="flex items-center">
                  <img src={logo} className="xx-App-logo h-8 w-8" alt="logo" />
                  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">NFT Rentals</span>
                  <a className="mr-3 text-sm font-medium text-gray-500 mx-5 dark:text-white hover:underline">
                  {sidebarOpen}
                    <ToggleEnvNet />
                  </a>
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
                          <Link to={'/query'}>
                            <a className="text-gray-900 dark:text-white hover:underline" aria-current="page">Query</a>
                          </Link>
                        </li>
                        <li>
                          <Link to={'/mutate'}>
                            <a className="text-gray-900 dark:text-white hover:underline" aria-current="page">Mutate</a>
                          </Link>
                        </li>
                        <li>
                          <Link to={'/updateProfile'}>
                            <a className="text-gray-900 dark:text-white hover:underline" aria-current="page">Update Profile</a>
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
                        <li>
                          <button id="dropdownNavbarLink" dataDropdownToggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                            Dropdown <svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd">
                              </path>
                            </svg>
                          </button>
                          <div id="dropdownNavbar" className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                              <ul class="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                <li>
                                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                </li>
                              </ul>
                              <div class="py-1">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign out</a>
                              </div>
                          </div>
                      </li>
                    </ul>
                </div>
            </div>
        </nav>
        
      </div>
     );
}
 
export default Navbar;