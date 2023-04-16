import React, { useState, useEffect } from 'react';
import copyIcon from '../assets/svgs/copy.svg';
import sendIcon from '../assets/svgs/send.svg';
import '../styles/components/wallet.scss';
import walletData from './../data/wallet.json';

const Wallet = () => {
  const [balance, setBalance] = useState('');
  const [address, setAddress] = useState('');
  const [showCopiedText, setShowCopiedText] = useState(false);

  useEffect(() => {
    setBalance(walletData.balance);
    setAddress(walletData.address);
  }, []);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(address)
    setShowCopiedText(true);
    setTimeout(() => setShowCopiedText(false), 2000);
  };

  const shortAddress = `${address.substring(0, 15)}...`;

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
          <button className="btn d-flex-center">
            <img src={sendIcon} alt="send" />
            <span>Send</span>
          </button>
          <button className="btn d-flex-center">
            <img className="recieve-icon" src={sendIcon} alt="send" />
            <span>Request</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
