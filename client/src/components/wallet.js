import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getWeb3, getBlockNestContract } from "../utils/blockNestContract"; //getBlockNestContract is used when a contract method is called

import Modal from "./modal";
import copyIcon from "../assets/svgs/copy.svg";
import sendIcon from "../assets/svgs/send.svg";
import walletIcon from "../assets/svgs/wallet.svg";
import submitIcon from "../assets/svgs/submit.svg";
import "../styles/components/wallet.scss";
import Popup from "./dynamicPopup";

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
    console.log("Submitted data:", data);
    // setShowSendModal(false);
    // if (data.status === "success") {
    //   setPopupStatus('payment success');
    // } else {
    //   setPopupStatus('payment failed');
    // }
    closeModal();
    setPopupStatus("payment failed");
    setShowPopup(true);
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
                  <input type="number" name="amount" id="amount" required />
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
                  <input type="number" name="amount" id="amount" required />
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
