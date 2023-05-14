import React from 'react'
import '../styles/pages/feedback.scss'
import NavBar from '../components/navbar';
const Feedback = () => {
  return (
    <>
      <NavBar />
      <div className="page-wrapper">
        <div className="card privacy-and-security">
          <div className="heading">
            <h1>Feedback</h1>
          </div>
          <form>
            <div className="formgroup">
              <label htmlFor="issue">Your Issue</label>
              <textarea
                type="text"
                name="issue"
                id="issue"
                rows={5}
                required
              />
            </div>

            <div className="formgroup">
              <label htmlFor="fileUpload">
                <p>Supporting Evidence</p>
                <input
                  type="file"
                  name="fileUpload"
                  id="fileUpload"
                  required
                  accept="image/png, image/jpg, image/gif, image/jpeg"
                />
              </label>
            </div>
            <div className='d-flex-center send-btn'>
              <input
                className="btn"
                type="submit"
                value="Send"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Feedback