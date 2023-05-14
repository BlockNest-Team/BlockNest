import React, { useEffect, useState } from 'react';
import '../styles/pages/helpAndSupport.scss';
import NavBar from '../components/navbar';
import FaqData from '../data/faqData.json';

const HelpAndSupport = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    setFaqData(FaqData);
  }, []);

  return (
    <>
      <NavBar />
      <div className="page-wrapper">
        <div className="card help-and-support">
          <div className="heading">
            <h1>Help and Support</h1>
          </div>
          <div className="row">
            <div className="col">
              <div className="tabs">
                {faqData.map((faq, index) => (
                  <div className="tab" key={index}>
                    <input type="checkbox" id={`chck${index + 1}`} />
                    <label className="tab-label d-flex-justify-between" htmlFor={`chck${index + 1}`}>
                      {faq.question}
                    </label>
                    <div className="tab-content">{faq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpAndSupport;
