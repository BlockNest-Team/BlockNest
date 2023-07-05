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
import payIcon from "../assets/svgs/pay.svg";
import "../styles/components/wallet.scss";
// import walletData from "./../data/wallet.json";
import Popup from "./dynamicPopup";
import jsonData from "../data/payRequestData.json";
import axios from "axios";
// import {
//   usePrepareContractWrite,
//   useContractWrite,
//   useWaitForTransaction,
// } from "wagmi";

const { ethereum } = window;

const Wallet = ({ currentPage, requests, getNameAndBalance }) => {
  // wallet portion implementation start
  // const [balance, setBalance] = useState("");
  const [balance, setBalance] = useState("...");
  const [address, setAddress] = useState("");
  const [payRequests, setPayRequests] = useState([]);

  const [payRequesterAddress, setPayRequesterAddress] = useState("");
  const [payRequesterName, setPayRequesterName] = useState("");
  const [payRequesterAmount, setPayRequesterAmount] = useState(0);
  const [payRequesterMessage, setPayRequesterMessage] = useState("");

  // requests["0"].length

  // function disconnectAndSetNull() {
  //   // disconnect();
  //   setName("...");
  //   setBalance("...");
  //   // setDollars("...");
  //   setHistory(null);
  //   setRequests({ 1: [0], 0: [] });
  // }

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

  // call it on page load
  // useEffect(() => {
  //   getNameAndBalance();
  // }, []);

  // const [payRequestData, setPayRequestData] = useState({
  //   senderAddress: "Dummy Sender Address",
  //   receiverAddress: "Dummy Receiver Address",
  //   message: "Dummy Message",
  //   amount: "100",
  // });

  const [payRequestData, setPayRequestData] = useState([]);

  useEffect(() => {
    setPayRequestData(jsonData);
  }, []);

  //****************** */ web3 stuff start  *************8888

  //****************** */ web3 stuff end  ******************

  // also add handle change wallet  method from navbar so taht if adddress is changed data changes in realtime
  // wallet portion implementation end

  const [showCopiedText, setShowCopiedText] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showRequestModal, setshowRequestModal] = useState(false);
  const [showPayRequestModal, setshowPayRequestModal] = useState(false);
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
    setshowRequestModal(true);
  };
  const openPayRequestModal = () => {
    setshowPayRequestModal(true);

    console.log("pay request modal", requests);
    // setPayRequests(requests);
    // console.log("pay request amount", requests[1][0]);
    setPayRequesterAddress(requests[0][0]);
    setPayRequesterName(requests[3][0]);
    const am = requests[1][0] / 1000000000000000000;

    setPayRequesterAmount(String(am));
    setPayRequesterMessage(requests[2][0]);
  };

  const closeModal = () => {
    setShowSendModal(false);
    setshowRequestModal(false);
    setshowPayRequestModal(false);
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

  const payRequestssss = async () =>
  // senderAddress,
  // payRequesterAddress,
  // payRequesterAmount,
  // payRequesterMessage
  {
    try {
      // setStatus("Logging in...");
      const web3 = await getWeb3();
      const contract = await getBlockNestContract(web3);
      const accounts = await web3.eth.getAccounts();
      const weiAmount = web3.utils.toWei(payRequesterAmount, "ether");
      console.log("weiAmount", weiAmount);
      console.log("RequesterAddress", payRequesterAddress);
      const payRequest = await contract.methods
        .payRequest(requests[0][0])
        .send({
          from: accounts[0],
          value: weiAmount,
        });
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
    sendBalance(data.receiverAddress, data.amount, "data.message");
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

  const handleSendFormSubmitR = (event, index) => {
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

    // payRequest();
    // senderAddress,
    // payRequesterAddress,
    // payRequesterAmount,
    // payRequesterMessage
    // call send balance here
    SendRequest(data.receiverAddress, data.amount, "");

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
    setPayRequestData((prevState) => {
      let newPayRequestData = [...prevState];
      newPayRequestData.splice(index, 1);
      if (newPayRequestData.length === 0) {
        setshowPayRequestModal(false);
      }
      return newPayRequestData;
    });
  };
  useEffect(() => {
    // Update the payRequests state based on the length of requests array
    // setPayRequests(Object.keys(requests[0]).length);
  }, [requests]);

  const handleRequestFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    setSendTransactions([...sendTransactions, data]);

    // Call send balance here
    SendRequest(data.receiverAddress, data.amount, data.message);
    console.log("Submitted data:", data);

    // Reset the form
    event.target.reset();

    // Increment the number of pay requests
    // setPayRequests(requests.length);
    // setPayRequests(requests + 1);

    // Close the pay request modal
    setshowPayRequestModal(false);

    if (data.status === "success") {
      setPopupStatus("payment success");
    } else {
      setPopupStatus("payment failed");
    }
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
          {(currentPage === "/home" ||
            currentPage === "/profile" ||
            currentPage === "/otherprofile" ||
            currentPage === "/myprofile") && (
              <Link to="/wallet">
                <button className="btn d-flex-center">
                  <img className="wallet-icon" src={walletIcon} alt="wallet" />
                  <span>View Wallet</span>
                </button>
              </Link>
            )}
          {/* Render Send and Request buttons only when on VIEWWALLET page */}
          {currentPage === "/wallet" && (
            <div className="button-container d-flex-col-align-center">
              <div className="btn-group d-flex-align-center">
                <button className="btn d-flex-center" onClick={openSendModal}>
                  <img src={sendIcon} alt="send" />
                  <span>Send</span>
                </button>
                <button
                  className="btn d-flex-center"
                  onClick={openReceiveModal}
                >
                  <img className="recieve-icon" src={sendIcon} alt="receive" />
                  <span>Request</span>
                </button>
                ِ
              </div>
              <button
                className="btn d-flex-center"
                onClick={openPayRequestModal}
                disabled={payRequestData.length === 0}
              >
                <div className="pay-request-circle">{payRequests}</div>
                <img className="pay-icon" src={payIcon} alt="receive" />
                <span>Pay</span>
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
                    min="0"
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
      {showRequestModal && (
        <Modal
          title="Request"
          onClose={closeModal}
          content={
            <div className="request-crypto-content d-flex-center">
              <form onSubmit={handleRequestFormSubmit}>
                <div className="formgroup">
                  <label htmlFor="senderAddress">Requester Address</label>
                  <input
                    type="text"
                    name="senderAddress"
                    id="senderAddress"
                    value={address}
                    required
                  />
                </div>
                <div className="formgroup">
                  <label htmlFor="receiverAddress">Payer Address</label>
                  <input
                    type="text"
                    name="receiverAddress"
                    id="receiverAddress"
                  // readOnly
                  />
                </div>
                <div className="formgroup">
                  <label htmlFor="message">Message</label>
                  <input type="text" name="message" id="message" required />
                </div>
                <div className="formgroup">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    step="any"
                    min="0"
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
      {showPayRequestModal && (
        <Modal
          title="Pay"
          onClose={closeModal}
          content={
            <div className="request-crypto-content d-flex-col">
              {requests && requests[0].length > 0 && (
                <>
                  <div className="group">
                    <h2>Sending payment to: </h2>
                    <p>{payRequesterAddress}</p>
                  </div>
                  <div className="group">
                    <h2>Value:</h2>
                    <p>{payRequesterAmount} ETH</p>
                  </div>
                  <div className="group">
                    <h2>Message:</h2>
                    <p>{payRequesterMessage}</p>
                  </div>
                  <div className="d-flex-center">
                    <button
                      className="btn d-flex-center"
                      onClick={payRequestssss}
                    >
                      <span>Pay</span>
                      <img src={submitIcon} alt="submit" />
                    </button>
                  </div>
                </>
              )}
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
