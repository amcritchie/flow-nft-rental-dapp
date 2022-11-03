import logo from './logo.svg';
import './App.css';

function App() {



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
                  <a href="tel:5541251234" className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">(555) 412-1234</a>
                  <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Login</a>
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
