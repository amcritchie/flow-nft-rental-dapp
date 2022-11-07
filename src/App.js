import "./flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";

import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Legacy from './components/legacy/Legacy';
import Interact from './components/interact/Interact';

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

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
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interact" element={<Interact />} />
            <Route path="/legacy" element={<Legacy />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
