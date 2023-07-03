/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../styles/pages/s.scss";
import "../styles/theme/theme.scss";
import axios from "axios";
import Loader from "../components/loader";
// import  from "dotenv";

import Replicate from "replicate";
import fetch from "cross-fetch";
import Navbar from "../components/navbar";

const StableDiffusion = () => {
  // const [prediction, setPrediction] = useState(null);
  const [srsAddress, setSrsAddress] = useState("");
  // const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);



  const [formData, setFormData] = useState({
    prompt: "",
    imageDimensions: "",
    negativePrompt: "",
    numOutputs: 1,
    numInferenceSteps: 1,
    guidanceScale: 1,
    scheduler: "",
    seed: "",
  });

  const StableDiffusions = async () => {
    console.log("running");
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
      fetch: fetch,
    });
    const output = await replicate.run(
      "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
      {
        input: {
          prompt: "a vision of paradise. unreal engine",
        },
      }
    );
    console.log("output");

    console.log(output);
    setSrsAddress(output);
  };

  const MintingNFT = async (event) => {
    // event.preventDefault();
    let url;
    // Upload file to IPFS
    try {
      const added = await client.add(fileN, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      url = `https://ipfs.io/ipfs/${added.path}`;
      console.log("ipfs url " + url);
    } catch (error) {
      console.log("Error uploading file: ", error);
      return;
    }

    // Mint NFT
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const contract = await getBlockNestContract(web3);
    // setStatus("Sending...");
    const tx = await contract.methods
      .mint(url)
      .send({ from: accounts[0], value: 1000000000000000 });
    console.log(tx.transactionHash);
    alert(
      "nft minted successfully at" +
      tx.transactionHash +
      "\n" +
      "check it at https://sepolia.etherscan.io/tx/" +
      tx.transactionHash
    );

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      isNft: true,
    };
    if (fileN) {
      const data = new FormData();
      const fileName = Date.now() + fileN.name;
      data.append("name", fileName);
      data.append("file", fileN);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
        console.log("File uploaded successfully " + data);
      } catch (err) { }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }

    // setStatus(`Minted successfully! Transaction hash: ${tx.transactionHash}`);

    console.log("Post as NFT");
  };

  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");
    setIsSubmitted(true);
    setIsLoading(true); // start loading
    // StableDiffusions();
    // Handle form submission logic here

    // const data = Object.fromEntries(formData.entries());
    const formData = new FormData(e.target);
    const { prompt, guidanceScale, negativePrompt, seed } = Object.fromEntries(
      formData.entries()
    );

    console.log("values for:  " + prompt, guidanceScale, seed);

    const res = await axios.post(`http://localhost:8800/generate`, {
      params: {
        prompt: prompt,
        guidanceScale: guidanceScale,
        negativePrompt: negativePrompt,
      },
    });

    const response = res.data.output[0];
    console.log(response);
    setSrsAddress(response);
    setIsLoading(false); // stop loading

  };

  const handleReset = () => {
    setFormData({
      prompt: "",
      imageDimensions: "",
      negativePrompt: "",
      numOutputs: 1,
      numInferenceSteps: 1,
      guidanceScale: 1,
      scheduler: "",
      seed: "",
    });
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(srsAddress);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'image.png'; // you can choose a different filename if you wish
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  const PostAsNft = () => {
    console.log("Post as NFT");
  }


  return (
    <>
      <Navbar />
      <div className="responsive-page">
        <div className="form-container">
          <form className="input-form" onSubmit={handleSubmit}>
            <h2 className="input-heading">Input</h2>
            <div className="formgroup">
              <label htmlFor="prompt">Prompt</label>
              <textarea
                type="text"
                id="prompt"
                name="prompt"
                value={formData.prompt}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formgroup">
              <label htmlFor="negativePrompt">Negative Prompt</label>
              <input
                type="text"
                id="negativePrompt"
                name="negativePrompt"
                value={formData.negativePrompt}
                onChange={handleChange}
              // required
              />
            </div>
            <div className="formgroup">
              <label htmlFor="seed">Seed</label>
              <input
                type="number"
                id="seed"
                name="seed"
                value={formData.seed}
                onChange={handleChange}
              // required
              />
            </div>
            <div className="formgroup">
              <label htmlFor="guidanceScale">Guidance Scale</label>
              <input
                className="slider"
                type="range"
                id="guidanceScale"
                name="guidanceScale"
                min={1}
                max={20}
                value={formData.guidanceScale}
                onChange={handleChange}
              />
              <span>{formData.guidanceScale}</span>
            </div>

            <div className="form-actions">
              <button className="btn" type="submit">Submit</button>
              <button className="btn" type="button" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className="output-container">
          <div className="output-section">
            <h2 className="output-heading">Output</h2>
            {isSubmitted ? (
              isLoading ? (
                <Loader />
              ) : (
                <>
                  <img
                    src={srsAddress}
                    alt="output"
                    width={480}
                    height={480}
                    onLoad={() => setIsLoading(false)}
                  />
                  <div className="action-buttons d-flex-center g-1">

                    <button className="btn" type="button" onClick={downloadImage}>Download</button>

                    <button className="btn" type="submit" onClick={PostAsNft}>Post as NFT</button>
                  </div>
                </>
              )
            ) : null}
          </div>
        </div>

      </div>

    </>
  );
};

export default StableDiffusion;
