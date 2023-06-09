import React from "react";
import "../styles/pages/ViewWallet.scss";
import Wallet from "../components/wallet";
import TransactionHistory from "../components/transactionHistory";
import Navbar from "../components/navbar";
import AccountDetails from "../components/accountDetails";
import { getWeb3, getBlockNestContract } from "../utils/blockNestContract"; //getBlockNestContract is used when a contract method is called
import { useState, useEffect } from "react";
import axios from "axios";

const ViewWallet = () => {
  const currentPage = window.location.pathname;

  const [address, setAddress] = useState("");
  // moralis stuff start
  const [name, setName] = useState("...");
  const [balance, setBalance] = useState("...");
  // const [dollars, setDollars] = useState("...");
  const [history, setHistory] = useState(null);
  const [requests, setRequests] = useState({ 1: [0], 0: [] });

  // fetch wallet  address
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
        const userBalance = await web3.eth.getBalance(userAddress);
        setAddress(userAddress).then(getNameAndBalance());
        setBalance(web3.utils.fromWei(userBalance, "ether"));
      } catch (error) {
        console.error("Error fetching account data:", error.message);
      }
    };

    fetchAccountData();
  }, []);

  // fetbalance name route

  async function getNameAndBalance() {
    console.log("moralis address " + address);
    console.log("no. of request", requests);
    const res = await axios.get(`http://localhost:8800/getNameAndBalance`, {
      params: { userAddress: address },
    });

    const response = res.data;
    console.log(response);

    if (response.name[1]) {
      setName(response.name[0]);
    }
    setBalance(String(response.balance));
    // setDollars(String(response.dollars));
    setHistory(response.history);
    setRequests(response.requests);
  }

  useEffect(() => {
    if (address !== "") {
      getNameAndBalance();
    }
  }, []);

  return (
    <>
      <Navbar />
      <button className="btn d-flex-center" onClick={getNameAndBalance}>
        aa
      </button>
      <div className="page-wrapper">
        <div className="grid-container">
          <div className="grid-left">
            <Wallet currentPage={currentPage}
              requests={requests}
              getNameAndBalance={getNameAndBalance}
            />
          </div>
          <div className="grid-left">
            <TransactionHistory history={history} />
          </div>

          <div className="grid-left">
            <AccountDetails address={address} name={name} balance={balance} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewWallet;
