import "./flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";

import logo from './logo.svg';
import './App.css';


function App() {

  const [user, setUser] = useState({loggedIn: null})

  useEffect(() => fcl.currentUser.subscribe(setUser), [])

  const AuthedState = () => {
    return (
      <div>
          <a href={ 'https://flowscan.org/account/' + user?.addr } target="_blank" className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">{user?.addr ?? "No Address"}</a>
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

  const Card = () => {
    return (
      <div className="flex p-6 font-mono">
        <div className="flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-teal-400">
          <img src="/retro-shoe.jpg" alt="" className="absolute z-10 inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
        </div>
        <form className="flex-auto pl-6">
          <div className="relative flex flex-wrap items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
            <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
              Retro Shoe
            </h1>
            <div className="relative text-lg text-white">
              $89.00
            </div>
            <div className="relative uppercase text-teal-400 ml-3">
              In stock
            </div>
          </div>
          <div className="flex items-baseline my-6">
            <div className="space-x-3 flex text-sm font-medium">
              <label>
                <input className="sr-only peer" name="size" type="radio" value="xs" defaultChecked />
                <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                  XS
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="s" />
                <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                  S
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="m" />
                <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                  M
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="l" />
                <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                  L
                </div>
              </label>
              <label>
                <input className="sr-only peer" name="size" type="radio" value="xl" />
                <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                  XL
                </div>
              </label>
            </div>
          </div>
          <div className="flex space-x-2 mb-4 text-sm font-medium">
            <div className="flex space-x-4">
              <button className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black" type="submit">
                Buy now
              </button>
              <button className="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900" type="button">
                Add to bag
              </button>
            </div>
            <button className="flex-none flex items-center justify-center w-12 h-12 text-black" type="button" aria-label="Like">
              <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </button>
          </div>
          <p className="text-xs leading-6 text-slate-500">
            Free shipping on all continental US orders.
          </p>
        </form>
      </div>
    )
  }

  // Navbar example from Flowbite --> https://flowbite.com/docs/components/navbar/
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
              <a href="https://flowbite.com" className="flex items-center">
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
                          <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
                      </li>
                      <li>
                          <a href="#" className="text-gray-900 dark:text-white hover:underline">Company</a>
                      </li>
                      <li>
                          <a href="#" className="text-gray-900 dark:text-white hover:underline">Team</a>
                      </li>
                      <li>
                          <a href="#" className="text-gray-900 dark:text-white hover:underline">Features</a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
      
      <Card />
      <Card />
      <Card />
    </div>
  )

  // Navbar example from Tailwind --> https://v1.tailwindcss.com/components/navigation#
  // return (
  //   <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
  //     <div className="flex items-center flex-shrink-0 text-white mr-6">
  //       <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
  //       <span className="font-semibold text-xl tracking-tight">Tailwind CSS</span>
  //     </div>
  //     <div className="block lg:hidden">
  //       <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
  //         <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
  //       </button>
  //     </div>
  //     <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
  //       <div className="text-sm lg:flex-grow">
  //         <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
  //           Docs
  //         </a>
  //         <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
  //           Examples
  //         </a>
  //         <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
  //           Blog
  //         </a>
  //       </div>
  //       <div>
  //         <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
  //       </div>
  //     </div>
  //   </nav>
  // )

  // Tailwind create-react-app guide return statement --> https://tailwindcss.com/docs/guides/create-react-app
  // return (
  //   <h1 className="text-3xl font-bold underline">
  //     Hello world!
  //   </h1>
  // )

  // Original Return HTML
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

}

export default App;
