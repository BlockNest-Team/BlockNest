// src/components/Navbar.js

// import React, { useState } from "react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "../styles/components/navbar.scss";
import Spinner from "./spinner"
import SearchBar from './searchbar'
import Settings from './settings'
// import { TransactionContext } from "../context/context";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);  // New state


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // done by saim

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
    // add things todo whenaccount is changed
  }, [walletAddress]);

  const connectWallet = async () => {
    setConnecting(true);  // Begin connecting
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
    setConnecting(false);
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  // done by saim end

  // doen by ali meta

  // In this code, the connectToMetaMask function is called when the user clicks the login button,
  // which first checks if MetaMask is installed and then prompts the user to connect to their wallet using window.ethereum.enable().
  // If the user grants permissi, the function logs to the console that the user has connected to MetaMask,
  // and you can then add your own web3 code to interact with the blockchain.

  // const connectToMetaMask = async () => {
  //   if (typeof window.ethereum !== "undefined") {
  //     console.log("User clicked login button");
  //     try {
  //       await window.ethereum.enable();
  //       console.log("User connected to MetaMask");
  //       // TODO: Add your web3 code here to interact with the blockchain
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   } else {
  //     console.log("Please install MetaMask to connect to the blockchain");
  //   }
  // };
  // doen by ali meta
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/home" className="navbar__logo">
          BlockNest
        </Link></div>
      <ul className={`navbar__links ${mobileMenuOpen ? "open" : ""}`}>
        <li className="navbar__item">
          <Link to="/home" className="navbar__link">
            Home
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/wallet" className="navbar__link">
            Wallet
          </Link>
        </li>
        <li className="navbar__item">
          <a href="/" className="navbar__link">
            Stories
          </a>
        </li>
        <li className="navbar__item">
          <a href="/" className="navbar__link">
            Messages
          </a>
        </li>
      </ul>
      {/* <button className="navbar__connect-btn" onClick={connectToMetaMask}>
        Connect Wallet
      </button> */}
      <div className="d-flex-center group">

        <SearchBar />
        <Settings />
        <button className="navbar__connect-btn" onClick={connectWallet}>
          <span className="is-link has-text-weight-bold">
            {connecting
              ? <span className="is-link has-text-weight-bold">
                <Spinner />
              </span>
              : <span className="is-link has-text-weight-bold">
                {walletAddress && walletAddress.length > 0
                  ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`
                  : "Connect Wallet"}
              </span>}
          </span>
        </button>
        <div
          className={`navbar__hamburger ${mobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;




// Test

// import { useEffect, useState } from "react";
// import "../styles/components/navbar.scss";

// const Navbar = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const [walletAddress, setWalletAddress] = useState("");

//   useEffect(() => {
//     getCurrentWalletConnected();
//     addWalletListener();
//   }, [walletAddress]);

//   const connectWallet = async () => {
//     if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         setWalletAddress(accounts[0]);
//         console.log(accounts[0]);
//       } catch (err) {
//         console.error(err.message);
//       }
//     } else {
//       console.log("Please install MetaMask");
//     }
//   };

//   const getCurrentWalletConnected = async () => {
//     if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_accounts",
//         });
//         if (accounts.length > 0) {
//           setWalletAddress(accounts[0]);
//           console.log(accounts[0]);
//         } else {
//           console.log("Connect to MetaMask using the Connect button");
//         }
//       } catch (err) {
//         console.error(err.message);
//       }
//     } else {
//       console.log("Please install MetaMask");
//     }
//   };

//   const addWalletListener = async () => {
//     if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
//       window.ethereum.on("accountsChanged", (accounts) => {
//         setWalletAddress(accounts[0]);
//         console.log(accounts[0]);
//       });
//     } else {
//       setWalletAddress("");
//       console.log("Please install MetaMask");
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar__logo">BlockNest</div>
//       <ul className={`navbar__links ${mobileMenuOpen ? "open" : ""}`}>
//         <li className="navbar__item">
//           <a href="/" className="navbar__link">
//             Home
//           </a>
//         </li>
//         <li className="navbar__item">
//           <a href="/" className="navbar__link">
//             Wallet
//           </a>
//         </li>
//         <li className="navbar__item">
//           <a href="/" className="navbar__link">
//             Friends
//           </a>
//         </li>
//         <li className="navbar__item">
//           <a href="/" className="navbar__link">
//             Messages
//           </a>
//         </li>
//       </ul>
//       <button className="navbar__connect-btn" onClick={connectWallet}>
//         <span className="is-link has-text-weight-bold">
//           {walletAddress && walletAddress.length > 0
//             ? `Connected: ${walletAddress.substring(
//               0,
//               6
//             )}...${walletAddress.substring(38)}`
//             : "Connect Wallet"}
//         </span>
//       </button>
//       <div
//         className={`navbar__hamburger ${mobileMenuOpen ? "open" : ""}`}
//         onClick={toggleMobileMenu}
//       >
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// test 2 (this code is updated with wallet connect animation)

// import { useEffect, useState } from "react";
// import "../styles/components/navbar.scss";
// import Spinner from "./spinner"
// const Navbar = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [connecting, setConnecting] = useState(false);  // New state


//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };


//   const [walletAddress, setWalletAddress] = useState("");

//   useEffect(() => {
//     getCurrentWalletConnected();
//     addWalletListener();
//   }, [walletAddress]);

//   const connectWallet = async () => {
//     setConnecting(true);  // Begin connecting
//     if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         setWalletAddress(accounts[0]);
//         console.log(accounts[0]);
//       } catch (err) {
//         console.error(err.message);
//       }
//     } else {
//       console.log("Please install MetaMask");
//     }
//   };

//   const getCurrentWalletConnected = async () => {
//     if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_accounts",
//         });
//         if (accounts.length > 0) {
//           setWalletAddress(accounts[0]);
//           console.log(accounts[0]);
//         } else {
//           console.log("Connect to MetaMask using the Connect button");
//         }
//       } catch (err) {
//         console.error(err.message);
//       }
//     } else {
//       console.log("Please install MetaMask");
//     }
//     setConnecting(false);
//   };

//   const addWalletListener = async () => {
//     if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
//       window.ethereum.on("accountsChanged", (accounts) => {
//         setWalletAddress(accounts[0]);
//         console.log(accounts[0]);
//       });
//     } else {
//       /* MetaMask is not installed */
//       setWalletAddress("");
//       console.log("Please install MetaMask");
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar__logo">BlockNest</div>
//       <ul className={`navbar__links ${mobileMenuOpen ? "open" : ""}`}>
//         <li className="navbar__item">
//           <a href="/home" className="navbar__link">
//             Home
//           </a>
//         </li>
//         <li className="navbar__item">
//           <a href="/" className="navbar__link">
//             Wallet
//           </a>
//         </li>
//         <li className="navbar__item">
//           <a href="/" className="navbar__link">
//             Stories
//           </a>
//         </li>
//         <li className="navbar__item">
//           <a href="/" className="navbar__link">
//             Notifications
//           </a>
//         </li>
//         <li className="navbar__item">
//           <a href="/" className="navbar__link">
//             Settings
//           </a>
//         </li>
//       </ul>
//       <button className="navbar__connect-btn" onClick={connectWallet}>
//         <span className="is-link has-text-weight-bold">
//           {connecting
//             ? <span className="is-link has-text-weight-bold">
//               <Spinner />
//             </span>
//             : <span className="is-link has-text-weight-bold">
//               {walletAddress && walletAddress.length > 0
//                 ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`
//                 : "Connect Wallet"}
//             </span>}
//         </span>
//       </button>
//       <div
//         className={`navbar__hamburger ${mobileMenuOpen ? "open" : ""}`}
//         onClick={toggleMobileMenu}
//       >
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
