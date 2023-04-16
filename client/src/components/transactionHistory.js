import React, { useState, useEffect } from "react";
import '../styles/components/transactionHistory.scss'
import transactionHistoryData from '../data/transactionHistory.json'

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  // for fetching data from the api
  // useEffect(() => {
  //   // Fetch transaction data from JSON file here
  //   fetch(transactionHistoryData)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data); // make sure the data is being fetched correctly
  //       setTransactions(data.transactions);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  // for fetching data from the json
  useEffect(() => {
    setTransactions(transactionHistoryData.transactions);
  }, []);

  console.log(transactions); // make sure the transactions are being set correctly

  return (
    <div className="card">
      <div className="transaction-history">
        <h2>Transaction History</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.date}</td>
                  <td>{transaction.time}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;