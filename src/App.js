import { useState, useEffect } from "react";

// import Providers from './providers/Providers.comp';
import AuthProvider from './providers/AuthProvider'
// import AuthProvider from './providers/UserProvider'

import "./flow/config";
import * as fcl from "@onflow/fcl";
import logo from './assets/logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import ToggleEnvNet from './components/toggleEnvNet/ToggleEnvNet';
import Home from './components/home/Home';
import Legacy from './components/legacy/Legacy';
import FlowAccountDetails from './components/flowAccountDetails/FlowAccountDetails';
import Interact from './components/interact/Interact';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import Mutate from './components/mutate/Mutate';
import Query from './components/query/Query';
import MyMoments from './components/myMoments/MyMoments';

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(true); // If currently on mobile, should change to false.

  const [user, setUser] = useState({loggedIn: null})
  const [name, setName] = useState('') // NEW
  const [transaction, setTransaction] = useState('') // NEW
  const [transactionStatus, setTransactionStatus] = useState(null) // NEW

  useEffect(() => fcl.currentUser.subscribe(setUser), [])

  console.log("==Wallet-----------|");
  console.log(user.addr);
  console.log("==Balance----------|");
  console.log(fcl.getAccount(user.addr));
  console.log("-------------------|");

  // Navbar example from Flowbite --> https://flowbite.com/docs/components/navbar/
  return (
    <Router>
      <AuthProvider>
      <div className="App">

          {/* Banner */}
          {/* <header className="bg-green-600 p-4">
              <h1 className="text-white text-xl text-center">Banner</h1>
              <h2 className="text-white text-l text-center">Scroll down to see the effect</h2>
          </header> */}

          {/* Navbar */}
          <nav className="z-50 sticky top-0 bg-blue-600 drop-shadow shadow-blue-600">
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          </nav>

          {/* Content */}
          {/* Github https://gist.github.com/BjornDCode/5cb836a6b23638d6d02f5cb6ed59a04a */}
          <div className="flex">

            {/* Sidebar */}
            <aside className="h-screen sticky top-20">
            {/* <aside className="h-screen sticky top-0"> */}
              <div className={` ${
                          sidebarOpen ? "w-80 p-3" : "w-0 p-0"
                          } flex flex-col h-screen bg-gray-800 shadow duration-300`}
                      >
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              </div>
            </aside>
            {/* Page Content */}
            {/* <main className="container mx-auto mt-12 bg-green-300"> */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/interact" element={<Interact />} />
                <Route path="/updateProfile" element={<UpdateProfile />} />
                <Route path="/mutate" element={<Mutate />} />
                <Route path="/query" element={<Query />} />
                <Route path="/flowAccountDetails" element={<FlowAccountDetails />} />
                <Route path="/legacy" element={<Legacy />} />
                <Route path="/myMoments" element={<MyMoments />} />
              </Routes>
            </main>

          </div>

        {/* <footer className="h-96 p-20 bg-red-600">
            <h1 className="text-white text-4xl text-center p-20">Footer</h1>
        </footer> */}

        </div>
        </AuthProvider>
    </Router>
  )
}

export default App;
