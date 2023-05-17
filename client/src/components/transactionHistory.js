import React, { useState, useEffect } from "react";
import "../styles/components/transactionHistory.scss";
import transactionHistoryData from "../data/transactionHistory.json";
import { getWeb3, getBlockNestContract } from "../utils/blockNestContract.js";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      // setStatus("Logging in...");
      const web3 = await getWeb3();
      const contract = await getBlockNestContract(web3);
      const accounts = await web3.eth.getAccounts();
      const Transactions = await contract.methods
        .getMyRequests(accounts[0])
        .call();

      // Transform the structure of arrays into an array of objects
      const transformedTransactions = Transactions[0].map((_, index) => ({
        requestor: Transactions[0][index],
        amount: Transactions[1][index],
        message: Transactions[2][index],
        name: Transactions[3][index],
      }));
      console.log("Transformed Transactions", transformedTransactions);
      setTransactions(transformedTransactions);

      // .then(function (response_, error) {
      //   if (error) {
      //     alert(error);
      //   }
      //   setTransactions(response_);
      //   console.log("userID", response_);
      // refID = Number(response_[1]);
      // totalDownline = Number(response_[2]);
      // activeUpline = response_[3];
      // activeDownline = response_[4];
      // });
      // console.log("Transactions", Transactions);

      // if (isRegistered) {
      //   setStatus("Login successful!");
      //   navigateToHome();
      //   // history.push("/home");
      // } else {
      //   setStatus("User does not exist. Please register first.");
      // }
    } catch (error) {
      console.error("Error during geting transactions:", error.message);
      // setStatus("Login failed.");
    }
  };

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
    getTransactions();
  }, []);

  // for fetching data from smartcontract usig web3
  // useEffect(() => {
  //   // Fetch transaction data from smart contract here
  //   // setTransactions(data.transactions);
  // }, []);

  console.log(transactions); // make sure the transactions are being set correctly

  return (
    <div className="card">
      <div className="transaction-history">
        <div className="card-heading">
          <h1>Transaction History</h1>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
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
                  <td>{transaction.requestor}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.message}</td>
                  <td>{transaction.name}</td>
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
