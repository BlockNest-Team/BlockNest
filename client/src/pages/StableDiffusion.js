import React, { useState } from 'react';
import '../styles/pages/s.scss';

const StableDiffusion = () => {
  const [formData, setFormData] = useState({
    prompt: '',
    imageDimensions: '',
    negativePrompt: '',
    numOutputs: 1,
    numInferenceSteps: 1,
    guidanceScale: 1,
    scheduler: '',
    seed: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleReset = () => {
    setFormData({
      prompt: '',
      imageDimensions: '',
      negativePrompt: '',
      numOutputs: 1,
      numInferenceSteps: 1,
      guidanceScale: 1,
      scheduler: '',
      seed: ''
    });
  };

  return (
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
          <div className="form-group">
            <label htmlFor="imageDimensions">Image Dimensions</label>
            <select
              id="imageDimensions"
              name="imageDimensions"
              value={formData.imageDimensions}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              {/* Add options for image dimensions */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="negativePrompt">Negative Prompt</label>
            <input
              type="text"
              id="negativePrompt"
              name="negativePrompt"
              value={formData.negativePrompt}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
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
          </div>
          <div className="form-group">
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
          </div>
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
              required
            />
            <span>{formData.guidanceScale}</span>
          </div>
          <div className="form-group">
            <label htmlFor="scheduler">Scheduler</label>
            <select
              id="scheduler"
              name="scheduler"
              value={formData.scheduler}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              {/* Add options for scheduler */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="seed">Seed</label>
            <input
              type="number"
              id="seed"
              name="seed"
              value={formData.seed}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>
      <div className="output-container">
        <div className="output-section">
          <h2 className="output-heading">Output</h2>
          {/* Display the image and its heading here */}
        </div>
      </div>
    </div>
  );
};

export default StableDiffusion;
