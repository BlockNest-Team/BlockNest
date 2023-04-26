import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
// import abi from "./BlockNestABI.json"; // Import ABI from JSON file

const contractAddress = "0xd706C58387d3eCcf2C9Ea111DeE5DA9E5E771126"; // Replace with your contract address
const abi = [
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

export const getWeb3 = async () => {
  const provider = await detectEthereumProvider();
  if (provider) {
    return new Web3(provider);
  }
  throw new Error("Please install MetaMask!");
};

export const getBlockNestContract = async (web3) => {
  if (!web3) {
    web3 = await getWeb3();
  }
  return new web3.eth.Contract(abi, contractAddress);
};
