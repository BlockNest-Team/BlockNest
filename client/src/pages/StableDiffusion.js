import React, { useState } from "react";
import "../styles/pages/s.scss";
import axios from "axios";
// import  from "dotenv";

import Replicate from "replicate";
import fetch from "cross-fetch";
import Navbar from "../components/navbar";

const StableDiffusion = () => {
  const [prediction, setPrediction] = useState(null);
  const [srsAddress, setSrsAddress] = useState("");
  const [error, setError] = useState(null);

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

  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");
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
  };

  const handleReset = () => {
    setFormData({
      prompt: "",
      imageDimensions: "",
      negativePrompt: "",
      numOutputs: 1,
      numInferenceSteps: 1,
      guidanceScale: 10,
      scheduler: "",
      seed: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="responsive-page">
        <div className="form-container">
          <form className="input-form" onSubmit={handleSubmit}>
            <h2 className="input-heading">Input</h2>
            <div className="form-group">
              <label htmlFor="prompt">Prompt</label>
              <input
                type="text"
                id="prompt"
                name="prompt"
                value={formData.prompt}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="form-group">
            <label htmlFor="imageDimensions">Image Dimensions</label>
            <select
              id="imageDimensions"
              name="imageDimensions"
              value={formData.imageDimensions}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option> */}
            {/* Add options for image dimensions */}
            {/* </select> */}
            {/* </div> */}
            <div className="form-group">
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
            {/* <div className="form-group">
            <label htmlFor="numOutputs">Number of Outputs</label>
            <input
              type="range"
              id="numOutputs"
              name="numOutputs"
              min={1}
              max={4}
              value={formData.numOutputs}
              onChange={handleChange}
              required
            />
            <span>{formData.numOutputs}</span>
          </div> */}
            {/* <div className="form-group">
            <label htmlFor="numInferenceSteps">Number of Inference Steps</label>
            <input
              type="range"
              id="numInferenceSteps"
              name="numInferenceSteps"
              min={1}
              max={500}
              value={formData.numInferenceSteps}
              onChange={handleChange}
              required
            />
            <span>{formData.numInferenceSteps}</span>
          </div> */}
            <div className="form-group">
              <label htmlFor="guidanceScale">Guidance Scale</label>
              <input
                type="range"
                id="guidanceScale"
                name="guidanceScale"
                min={1}
                max={20}
                value={formData.guidanceScale}
                onChange={handleChange}
                // required
              />
              <span>{formData.guidanceScale}</span>
            </div>
            {/* <div className="form-group">
            <label htmlFor="scheduler">Scheduler</label>
            <select
              id="scheduler"
              name="scheduler"
              value={formData.scheduler}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option> */}
            {/* Add options for scheduler */}
            {/* </select>
          </div> */}
            <div className="form-group">
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
            <div className="form-actions">
              <button type="submit">Submit</button>
              <button type="button" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
          {/* <div className="output-container"> */}
          {/* <img
          // src={prediction.output[0]}
          src={srsAddress}
          alt="output"
          width={512}
          height={512}
        /> */}
          {/* <p>url : {srsAddress}</p> */}
          {/* </div> */}
        </div>
        <div className="output-container">
          <div className="output-section">
            <h2 className="output-heading">Output</h2>
            <img
              // src={prediction.output[0]}
              src={srsAddress}
              alt="output"
              width={512}
              height={512}
            />
            <p>url : {srsAddress}</p>

            {/* Display the image and its heading here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default StableDiffusion;
