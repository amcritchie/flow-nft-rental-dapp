import "../../flow/config";
import logo from '../../logo.svg';
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";



const Navbar = () => {
    const [user, setUser] = useState({loggedIn: null})
    const [name, setName] = useState('') // NEW
  
    useEffect(() => fcl.currentUser.subscribe(setUser), [])
  
    console.log("==Wallet-----------|");
    console.log(user.addr);
    console.log("==Balance----------|");
    console.log(fcl.getAccount(user.addr));
    console.log("-------------------|");

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

    return ( 
        <div>
        <nav className="navbar bg-white border-gray-200 dark:bg-gray-900">
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
      </div>
     );
}
 
export default Navbar;