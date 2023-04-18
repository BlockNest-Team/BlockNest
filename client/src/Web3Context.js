// src/Web3Context.js
import React, { createContext, useState, useEffect } from "react";
import Web3 from "web3";

const contractABI = [
  {
    inputs: [],
    name: "register",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "isRegistered",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contractAddress = "0xd706C58387d3eCcf2C9Ea111DeE5DA9E5E771126"; // Copy the contract address from Remix
const Web3Context = createContext();

const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [userAuth, setUserAuth] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        setWeb3(new Web3(window.ethereum));
        const instance = new web3.eth.Contract(contractABI, contractAddress);
        setUserAuth(instance);
        setIsConnected(true);
      }
    };

    init();
  }, [web3]);

  return (
    <Web3Context.Provider value={{ web3, userAuth, isConnected }}>
      {children}
    </Web3Context.Provider>
  );
};

export { Web3Context, Web3Provider };
