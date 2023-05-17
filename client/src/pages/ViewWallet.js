import React from 'react'
import '../styles/pages/ViewWallet.scss'
import Wallet from '../components/wallet'
import TransactionHistory from '../components/transactionHistory'
import Navbar from '../components/navbar'

const ViewWallet = () => {
  const currentPage = window.location.pathname;

  return (
    <>
      <Navbar />
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
    </>
  )
}

export default ViewWallet