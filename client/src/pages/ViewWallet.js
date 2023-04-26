import React from 'react'
import '../styles/pages/ViewWallet.scss'
import Wallet from '../components/wallet'
import TransactionHistory from '../components/transactionHistory'

const ViewWallet = () => {
  const currentPage = window.location.pathname;

  return (
    <div className="page-wrapper">
      <div className='grid-container'>
        <div className="grid-left">
          <Wallet currentPage={currentPage} />
        </div>
        <div className="grid-left">
          <TransactionHistory />
        </div>
      </div>
    </div>
  )
}

export default ViewWallet