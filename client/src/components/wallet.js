import React, { useState, useEffect } from 'react';
import Modal from './modal';
import copyIcon from '../assets/svgs/copy.svg';
import sendIcon from '../assets/svgs/send.svg';
import '../styles/components/wallet.scss';
import walletData from './../data/wallet.json';

const Wallet = () => {
  const [balance, setBalance] = useState('');
  const [address, setAddress] = useState('');
  const [showCopiedText, setShowCopiedText] = useState(false);
  const [showSendModal, setShowSendModal] = useState(true);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

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

  useEffect(() => {
    setBalance(walletData.balance);
    setAddress(walletData.address);
  }, []);

  return (
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
          content={<div>Send modal content here</div>}
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
  );
};

export default Wallet;
