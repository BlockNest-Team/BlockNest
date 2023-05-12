import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import web3 from "web3";
import { getWeb3, getBlockNestContract } from "../utils/blockNestContract"; //getBlockNestContract is used when a contract method is called
// import {
//   getWeb3,
//   getBlockNestContract,
// } from "../utils/blockNestContract"; //getBlockNestContract is used when a contract method is called

import Modal from "./modal";
import copyIcon from "../assets/svgs/copy.svg";
import sendIcon from "../assets/svgs/send.svg";
import walletIcon from "../assets/svgs/wallet.svg";
import submitIcon from "../assets/svgs/submit.svg";
import friendRequestIcon from "../assets/svgs/friendrequest.svg";
import cancelfriendRequestIcon from "../assets/svgs/cancelFriendsRequest.svg";
import "../styles/components/wallet.scss";
import walletData from "./../data/wallet.json";
import Popup from "./dynamicPopup";

const { ethereum } = window;

const Wallet = ({ currentPage }) => {
  // wallet portion implementation start
  const [balance, setBalance] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
        const userBalance = await web3.eth.getBalance(userAddress);

        setAddress(userAddress);
        setBalance(web3.utils.fromWei(userBalance, "ether"));
      } catch (error) {
        console.error("Error fetching account data:", error.message);
      }
    };

    fetchAccountData();
  }, []);
  //****************** */ web3 stuff start  *************8888

  //****************** */ web3 stuff end  ******************

  // also add handle change wallet  method from navbar so taht if adddress is changed data changes in realtime
  // wallet portion implementation end

  const [showCopiedText, setShowCopiedText] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [sendTransactions, setSendTransactions] = useState([]);
  const [popupStatus, setPopupStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(address);
    setShowCopiedText(true);
    setTimeout(() => setShowCopiedText(false), 2000);
  };

  const shortAddress = `${address.substring(0, 15)}...`;
  const shortBalance = `${balance.substring(0, 6)}...`; // modify it so that it shows last 3 values as the are the token SYmbol

  const openSendModal = () => {
    setShowSendModal(true);
  };

  const openReceiveModal = () => {
    setShowReceiveModal(true);
  };

  const closeModal = () => {
    setShowSendModal(false);
    setShowReceiveModal(false);
  };

  // implement web3 here

  const sendBalance = async (receiverAddress, amount, msg) => {
    try {
      // setStatus("Logging in...");
      const web3 = await getWeb3();
      const contract = await getBlockNestContract(web3);
      const accounts = await web3.eth.getAccounts();
      const weiAmount = web3.utils.toWei(amount, "ether");
      console.log("weiAmount", weiAmount);
      console.log("receiverAddress", receiverAddress);
      const shareBalance = await contract.methods
        .shareBalance(receiverAddress, weiAmount, msg)
        .send({
          from: accounts[0],
        })
        .then(
          web3.eth.sendTransaction({
            from: accounts[0],
            to: receiverAddress,
            value: weiAmount,
          })
        );
      console.log("shareBalance", shareBalance);

      // for ssending money
      // web3.eth
      //   .sendTransaction({
      //     from: accounts[0],
      //     to: receiverAddress,
      //     value: weiAmount,
      //     methods:
      //   })
      //   .then(function (receipt) {
      //     // will be fired once the receipt is mined
      //     console.log(receipt);
      //     contract.methods
      //       .addToBlockchain(receiverAddress, weiAmount, msg)
      //       .send({
      //         from: accounts[0],
      //       });
      //   });

      //
      // try {
      //   if (ethereum) {
      //     await ethereum.request({
      //       method: "eth_sendTransaction",
      //       params: [
      //         {
      //           from: accounts[0],
      //           to: receiverAddress,
      //           gas: "0x5208",
      //           value: weiAmount._hex,
      //         },
      //       ],
      //     });

      //     const shareBalance = await contract.methods
      //       .addToBlockchain(receiverAddress, weiAmount, msg, accounts[0])
      //       .call();
      //     console.log("shareBalance", shareBalance);
      //   } else {
      //     console.log("No ethereum object");
      //   }
      // } catch (error) {
      //   console.log(error);

      //   throw new Error("No ethereum object");
      // }

      //

      // if (isRegistered) {
      //   setStatus("Login successful!");
      //   navigateToHome();
      //   // history.push("/home");
      // } else {
      //   setStatus("User does not exist. Please register first.");
      // }
    } catch (error) {
      console.error("Error during sentpayment:", error.message);
      // setStatus("Login failed.");
    }
  };

  const SendRequest = async (senderAddress, amount, msg) => {
    try {
      // setStatus("Logging in...");
      const web3 = await getWeb3();
      const contract = await getBlockNestContract(web3);
      const accounts = await web3.eth.getAccounts();
      const weiAmount = web3.utils.toWei(amount, "ether");
      console.log("weiAmount", weiAmount);
      console.log("RequesterAddress", senderAddress);
      const shareBalance = await contract.methods
        .createRequest(senderAddress, weiAmount, msg)
        .send({
          from: accounts[0],
        });

      // if (isRegistered) {
      //   setStatus("Login successful!");
      //   navigateToHome();
      //   // history.push("/home");
      // } else {
      //   setStatus("User does not exist. Please register first.");
      // }
    } catch (error) {
      console.error("Error during sentpayment:", error.message);
      // setStatus("Login failed.");
    }
  };
  // implement web3 here endforshare

  const handleSendFormSubmit = (event) => {
    // event.preventDefault();
    // const senderAddress = event.target.elements.senderAddress.value;
    // const receiverAddress = event.target.elements.receiverAddress.value;
    // const amount = event.target.elements.amount.value;
    // const newTransaction = {
    //   senderAddress,
    //   receiverAddress,
    //   amount,
    //   date: new Date().toLocaleString(),
    // };
    // setSendTransactions([...sendTransactions, newTransaction]);
    // localStorage.setItem('sendTransactions', JSON.stringify([...sendTransactions, newTransaction]));
    // event.target.reset();
    // console.log(newTransaction);
    // setShowSendModal(false);

    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    setSendTransactions([...sendTransactions, data]);

    // call send balance here
    sendBalance(data.receiverAddress, data.amount, "msg here add msg input");
    // SendRequest(data.receiverAddress, data.amount, "msg here add msg input");

    console.log("Submitted data:", data);

    // setShowSendModal(false);
    if (data.status === "success") {
      setPopupStatus("payment success");
    } else {
      setPopupStatus("payment failed");
    }
    // closeModal();
    // setPopupStatus("payment failed");
    // setShowPopup(true);
  };

  const handleSendFormSubmitR = (event) => {
    // event.preventDefault();
    // const senderAddress = event.target.elements.senderAddress.value;
    // const receiverAddress = event.target.elements.receiverAddress.value;
    // const amount = event.target.elements.amount.value;
    // const newTransaction = {
    //   senderAddress,
    //   receiverAddress,
    //   amount,
    //   date: new Date().toLocaleString(),
    // };
    // setSendTransactions([...sendTransactions, newTransaction]);
    // localStorage.setItem('sendTransactions', JSON.stringify([...sendTransactions, newTransaction]));
    // event.target.reset();
    // console.log(newTransaction);
    // setShowSendModal(false);

    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    setSendTransactions([...sendTransactions, data]);

    // call send balance here
    SendRequest(data.receiverAddress, data.amount, "msg");

    console.log("Submitted data:", data);

    // setShowSendModal(false);
    if (data.status === "success") {
      setPopupStatus("payment success");
    } else {
      setPopupStatus("payment failed");
    }
    // closeModal();
    // setPopupStatus("payment failed");
    // setShowPopup(true);
  };

  return (
    <div className="card">
      <div className="wallet-content d-flex-center d-flex-col">
        <div className="balance-container d-flex-align-center d-flex-col">
          <h1>{shortBalance} ETH </h1>
          {/* <h1>{shortBalance*2000} USD </h1> */}
          <span className="d-flex-align-center">
            <p>{shortAddress}</p>
            <img
              className="copy-icon"
              src={copyIcon}
              alt="copy"
              onClick={handleCopyClick}
            />
          </span>
          {showCopiedText && <div className="copied-text">Copied!</div>}
        </div>
        <div className="button-container d-flex-align-center">
          {/* Render View Wallet button only when on home page */}
          {currentPage === "/home" && (
            <Link to="/wallet">
              <button className="btn d-flex-center">
                <img className="wallet-icon" src={walletIcon} alt="wallet" />
                <span>View Wallet</span>
              </button>
            </Link>
          )}
          {/* Render Send and Request buttons only when on VIEWWALLET page */}
          {currentPage === "/wallet" && (
            <div className="button-container d-flex-align-center">
              <button className="btn d-flex-center" onClick={openSendModal}>
                <img src={sendIcon} alt="send" />
                <span>Send</span>
              </button>
              <button className="btn d-flex-center" onClick={openReceiveModal}>
                <img className="recieve-icon" src={sendIcon} alt="receive" />
                <span>Request</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {showSendModal && (
        <Modal
          title="Send"
          onClose={closeModal}
          content={
            <div className="send-crypto-content d-flex-center">
              <form onSubmit={handleSendFormSubmit}>
                <div className="formgroup">
                  <label htmlFor="senderAddress">Sender’s Address</label>
                  <input
                    type="text"
                    name="senderAddress"
                    id="senderAddress"
                    value={address}
                    readOnly
                  />
                </div>
                <div className="formgroup">
                  <label htmlFor="receiverAddress">Reciever’s Address</label>
                  <input
                    type="text"
                    name="receiverAddress"
                    id="receiverAddress"
                    required
                  />
                </div>
                <div className="formgroup">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    step="any"
                    name="amount"
                    id="amount"
                    required
                  />
                </div>
                <div className="btn-container d-flex-center">
                  <button className="btn d-flex-center" type="submit">
                    <span>Send</span>
                    <img src={submitIcon} alt="submit" />
                  </button>
                </div>
              </form>
            </div>
          }
        />
      )}
      {showReceiveModal && (
        <Modal
          title="Request"
          onClose={closeModal}
          content={
            <div className="request-crypto-content d-flex-center">
              <form onSubmit={handleSendFormSubmitR}>
                <div className="formgroup">
                  <label htmlFor="senderAddress">Sender’s Address</label>
                  <input
                    type="text"
                    name="senderAddress"
                    id="senderAddress"
                    value={address}
                    readOnly
                  />
                </div>
                <div className="formgroup">
                  <label htmlFor="receiverAddress">Reciever’s Address</label>
                  <input
                    type="text"
                    name="receiverAddress"
                    id="receiverAddress"
                    required
                  />
                </div>
                <div className="formgroup">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    step="any"
                    id="amount"
                    required
                  />
                </div>
                <div className="btn-container d-flex-center">
                  <button className="btn d-flex-center" type="submit">
                    <span>Request</span>
                    <img src={submitIcon} alt="submit" />
                  </button>
                </div>
              </form>
            </div>
          }
        />
      )}

      {showPopup && (
        <Popup status={popupStatus} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default Wallet;
