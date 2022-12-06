import * as fcl from "@onflow/fcl";
import {useCurrentUser, useAccount, fmtFlow} from "@onflow/fcl-react"

import Navbar from '../navbar/Navbar';

import logo from '../../assets/logo.svg';
import flowLogo from '../../assets/flowLogo.png';
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import ToggleEnvNet from '../toggleEnvNet/ToggleEnvNet';


// import ToggleEnvNet from './components/toggleEnvNet/ToggleEnvNet';
import Home from '../home/Home';
import Legacy from '../legacy/Legacy';
import FlowAccountDetails from '../flowAccountDetails/FlowAccountDetails';
import Interact from '../interact/Interact';
import UpdateProfile from '../updateProfile/UpdateProfile';
import Mutate from '../mutate/Mutate';
import Query from '../query/Query';


// Sidebar example https://larainfo.com/blogs/react-tailwind-css-sidebar-example

const Sidebar = ({sidebarOpen, setSidebarOpen}) => {

   const [user, setUser] = useState({loggedIn: null})
   const [name, setName] = useState('') // NEW
   const [acct, refetchAcct] = useAccount(user.addr)
   const [flowBalance, setFlowBalance] = useState(0)

       // Run hook only on load.  Dependancy [] 
       useEffect(() => fcl.currentUser.subscribe(setUser), [])

   const [open, setOpen] = useState(false);

   const AuthedState = () => {
      return (
        <div>
         { user?.addr && // Load Flow wallet when ready.
            <div className="">
              <a href={ 'https://testnet.flowscan.org/account/' + user?.addr } target="_blank" className="text-m font-medium text-gray-500 dark:text-white hover:underline">
                {user?.addr}
              </a>
              {/* <a onClick={fcl.unauthenticate} className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Log Out</a> */}
            </div>
          }
          { acct?.balance && // Load Flow balance when ready.
          <a className="text-sm font-medium text-gray-500 dark:text-white hover:underline">
            {acct?.balance / 100000000 ?? 0}
            <img src={flowLogo} className="h-4 w-4 mx-1 mb-1 inline" alt="logo" />
          </a>
          }
        </div>
      )
    }

  const UnauthenticatedState = () => {
      return (
        <div>
          <a onClick={fcl.signUp} className="mr-6 text-sm font-medium text-gray-100 dark:text-white hover:underline">Login</a>
        </div>
      )
    }

    return ( 
        <div className="sidebar">
                    <div className="space-y-3">
                        <a className="flex items-center p-2 space-x-3 rounded-md"
                        href="#"
                                    
                        >
                            {user.loggedIn
                            ? <AuthedState />
                            : <UnauthenticatedState />
                            }
                         </a>
                         <div class="my-2 bg-gray-600 h-[1px]"></div>
                         <div className="relative">     
                            <span className="absolute inset-y-0 left-0 flex items-center py-4">
                                <button
                                    type="submit"
                                    className="p-2 focus:outline-none focus:ring"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                           d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                       />
                                   </svg>
                               </button>
                           </span>
                           <input
                               type="search"
                               name="Search"
                               placeholder="Search Momenents..."
                               className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
                           />
                        </div>
                        <div className="flex-1">
                                   <ul className="pt-2 pb-4 space-y-1 text-sm">
                                            <li className="rounded-sm">
                                                <a
                                                    href="#"
                                                    className="flex items-center p-2 space-x-3 rounded-md"
                                                >

                                                    {user.loggedIn
                                                    ? <AuthedState />
                                                    : <UnauthenticatedState />
                                                    }
                                                </a>
                                            </li>
                                            <li className="rounded-sm">
                                                <a
                                                    href="#"
                                                    className="flex items-center p-2 space-x-3 rounded-md"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-6 h-6 text-gray-100"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                        />
                                                    </svg>
                                                    <span className="text-gray-100">Home</span>
                                                </a>
                                            </li>
                                            <li className="rounded-sm">
                                                <Link to={'/updateProfile'}>
                                                    <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                    <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-6 h-6 text-gray-100"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                                            />
                                                        </svg>
                                                        <span className="text-gray-100">Moments</span>
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm">
                                                <a
                                                    href="#"
                                                    className="flex items-center p-2 space-x-3 rounded-md"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-6 h-6 text-gray-100"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                                        />
                                                    </svg>
                                                    <span className="text-gray-100">
                                                        Listings
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="rounded-sm">
                                                <a
                                                    href="#"
                                                    className="flex items-center p-2 space-x-3 rounded-md"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-6 h-6 text-gray-100"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                    <span className="text-gray-100">
                                                        Rentals
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="rounded-sm">
                                                <a
                                                    href="#"
                                                    className="flex items-center p-2 space-x-3 rounded-md"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-6 h-6 text-gray-100"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                        />
                                                    </svg>
                                                    <span className="text-gray-100">
                                                        Logout
                                                    </span>
                                                </a>
                                            </li>
                                   </ul>
                                   <div id="dropdown-cta" class="p-4 mt-6 bg-blue-50 rounded-lg dark:bg-blue-900" role="alert">
                                    <div class="flex items-center mb-3">
                                        <span class="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
                                        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800" data-collapse-toggle="dropdown-cta" aria-label="Close">
                                            <span class="sr-only">Close</span>
                                            <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        </button>
                                    </div>
                                    <p class="mb-3 text-sm text-blue-900 dark:text-blue-400">
                                        Preview the new Flowbite dashboard navigation! You can turn the new navigation off for a limited time in your profile.
                                    </p>
                                <a class="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" href="#">Turn new navigation off</a>
                            </div>
                        </div>
                    </div>


            {/* <div className="flex">
                <div
                    className={` ${
                    sidebarOpen ? "w-80 p-3" : "w-0 p-0"
                    } flex flex-col h-screen bg-gray-800 shadow duration-300`}
                >
                    <div className="space-y-3">
                    <a
                        href="#"
                        className="flex items-center p-2 space-x-3 rounded-md"
                    >

                        {user.loggedIn
                        ? <AuthedState />
                        : <UnauthenticatedState />
                        }
                    </a>
                    <div class="my-2 bg-gray-600 h-[1px]"></div>
                    <div className="relative">
                        
                        <span className="absolute inset-y-0 left-0 flex items-center py-4">
                            <button
                                type="submit"
                                className="p-2 focus:outline-none focus:ring"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </span>
                        <input
                            type="search"
                            name="Search"
                            placeholder="Search Momenents..."
                            className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >

                                    {user.loggedIn
                                       ? <AuthedState />
                                       : <UnauthenticatedState />
                                       }
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    <span className="text-gray-100">Home</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                    </svg>
                                    <span className="text-gray-100">Moments</span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        />
                                    </svg>
                                    <span className="text-gray-100">
                                        Listings
                                    </span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span className="text-gray-100">
                                        Rentals
                                    </span>
                                </a>
                            </li>
                            <li className="rounded-sm">
                                <a
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span className="text-gray-100">
                                        Logout
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <div id="dropdown-cta" class="p-4 mt-6 bg-blue-50 rounded-lg dark:bg-blue-900" role="alert">
                            <div class="flex items-center mb-3">
                                <span class="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
                                <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800" data-collapse-toggle="dropdown-cta" aria-label="Close">
                                    <span class="sr-only">Close</span>
                                    <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>
                            <p class="mb-3 text-sm text-blue-900 dark:text-blue-400">
                                Preview the new Flowbite dashboard navigation! You can turn the new navigation off for a limited time in your profile.
                            </p>
                            <a class="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" href="#">Turn new navigation off</a>
                        </div>
                    </div>
                </div>
            </div> */}
{/* 
            <div className="content grow">
                <div className="h-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/interact" element={<Interact />} />
                    <Route path="/updateProfile" element={<UpdateProfile />} />
                    <Route path="/mutate" element={<Mutate />} />
                    <Route path="/query" element={<Query />} />
                    <Route path="/flowAccountDetails" element={<FlowAccountDetails />} />
                    <Route path="/legacy" element={<Legacy />} />
                </Routes>
                </div>
             </div> */}

            {/* <div className="container mx-auto mt-12">
                <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total users
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            12,00
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total Profit
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            $ 450k
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total Orders
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            20k
                        </div>
                    </div>
                </div>
            </div> */}
        {/* </div> */}
        </div>
     );
}
 
export default Sidebar;