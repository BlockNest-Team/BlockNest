import React, { useState, useEffect } from 'react';
import Modal from './modal';
import copyIcon from '../assets/svgs/copy.svg';
import sendIcon from '../assets/svgs/send.svg';
import submitIcon from '../assets/svgs/submit.svg'
import '../styles/components/wallet.scss';
import walletData from './../data/wallet.json';
import Popup from './dynamicPopup'

const Wallet = () => {
  const [balance, setBalance] = useState('');
  const [address, setAddress] = useState('');
  const [showCopiedText, setShowCopiedText] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [sendTransactions, setSendTransactions] = useState([]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(address)
    setShowCopiedText(true);
    setTimeout(() => setShowCopiedText(false), 2000);
  };

  const shortAddress = `${address.substring(0, 15)}...`;

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
    console.log('Submitted data:', data);
    // setShowSendModal(false);
  };

  useEffect(() => {
    setBalance(walletData.balance);
    setAddress(walletData.address);
  }, []);


  return (
    <>
      <Popup />
      <div className="card">
        <div className="wallet-content d-flex-center d-flex-col">
          <div className="balance-container d-flex-align-center d-flex-col">
            <h1>{balance}</h1>
            <span className='d-flex-align-center'>
              <p>{shortAddress}</p>
              <img className="copy-icon" src={copyIcon} alt="copy" onClick={handleCopyClick} />
            </span>
            {showCopiedText && (
              <div className="copied-text">Copied!</div>
            )}
          </div>
          <div className="button-container d-flex-align-center">
            <button className="btn d-flex-center" onClick={openSendModal}>
              <img src={sendIcon} alt="send" />
              <span>Send</span>
            </button>
            <button className="btn d-flex-center" onClick={openReceiveModal}>
              <img className="recieve-icon" src={sendIcon} alt="send" />
              <span>Request</span>
            </button>
          </div>
        </div>
        {showSendModal && (
          <Modal
            title="Send"
            onClose={closeModal}
            content={<div className="send-crypto-content d-flex-center">
              <form onSubmit={handleSendFormSubmit}>
                <div className="formgroup">
                  <label htmlFor="senderAddress">Sender’s Address</label>
                  <input type="text" name="senderAddress" id="senderAddress" value={address} readOnly />
                </div>
                <div className="formgroup">
                  <label htmlFor="receiverAddress">Reciever’s Address</label>
                  <input type="text" name="receiverAddress" id="receiverAddress" required />
                </div>
                <div className="formgroup">
                  <label htmlFor="amount">Amount</label>
                  <input type="number" name="amount" id="amount" required />
                </div>
                <div className="btn-container d-flex-center">
                  <button className='btn d-flex-center' type="submit">
                    <span>Request</span>
                    <img src={submitIcon} alt="submit" />
                  </button>
                </div>
              </form>
            </div>}
          />
        )}
        {showReceiveModal && (
          <Modal
            title="Request"
            onClose={closeModal}
            content={<div>Receive modal content here</div>}
          />
        )}
      </div>
    </>
  );
};

export default Wallet;
