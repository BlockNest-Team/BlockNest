import React from 'react'
import Wallet from '../components/wallet'

const ViewWallet = () => {
  const currentPage = window.location.pathname;

  return (
    <Wallet currentPage={currentPage} />
  )
}

export default ViewWallet