import React, { useState } from "react";
// import { create } from "ipfs-http-client";
import { getWeb3, getBlockNestContract } from "../utils/blockNestContract.js";
import { Buffer } from "buffer";

import { create as ipfsHttpClient } from "ipfs-http-client";
const projectId = "2PsRn0pVgr9ykZxcYkvlXf72liD";
const projectSecretKey = "ac4c2958bd722f4df62eabb86fd47d3b";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`;

// const subdomain = "your sub domain";

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const MintNFT = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [status, setStatus] = useState("");

  const onChange = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log("ipfs url " + url);
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getBlockNestContract(web3);
    setStatus("Sending...");
    const tx = await contract.methods
      .mint(fileUrl)
      .send({ from: accounts[0], value: 1000000000000000 });
    setStatus(`Minted successfully! Transaction hash: ${tx.transactionHash}`);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onChange} />
        <input type="submit" />
      </form>
      <p>Status: {status}</p>
    </div>
  );
};

export default MintNFT;
