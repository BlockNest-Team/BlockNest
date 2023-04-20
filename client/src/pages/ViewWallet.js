import React from 'react'
import Wallet from '../components/wallet'
import TransactionHistory from '../components/transactionHistory'

const ViewWallet = () => {
  const currentPage = window.location.pathname;

  return (
    <>
      <Wallet currentPage={currentPage} />
      <TransactionHistory />
    </>
  )
}

export default ViewWallet