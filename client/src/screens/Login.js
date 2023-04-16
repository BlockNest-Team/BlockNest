import React from 'react'
import '.././../src/index.scss'

const Login = () => {

  // In this code, the connectToMetaMask function is called when the user clicks the login button, 
  // which first checks if MetaMask is installed and then prompts the user to connect to their wallet using window.ethereum.enable(). 
  // If the user grants permission, the function logs to the console that the user has connected to MetaMask, 
  // and you can then add your own web3 code to interact with the blockchain.
  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('User clicked login button');
      try {
        await window.ethereum.enable();
        console.log('User connected to MetaMask');
        // TODO: Add your web3 code here to interact with the blockchain
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('Please install MetaMask to connect to the blockchain');
    }
  };

  return (
    <div className="container d-flex-justify-center">
      <div className="login-container ">
        <div className="app-name">
          <h1>BlockNest</h1>
        </div>
        <div className="card ">
          <div className="login-content d-flex-align-center d-flex-col">
            <div className="login-heading ">
              <h1>Login</h1>
            </div>
            <div className="login-profile-details d-flex-center d-flex-col">
              <div className="profile-pic">
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile-pic" />
              </div>

              <div className="profile-name">
                <p>John Doe</p>
              </div>

              <div className="btn-container">
                <a href='/' className=' login-btn'>
                  <button className='btn' onClick={connectToMetaMask}>Authorize Login</button>
                </a>
              </div>
              <div className="redirect">
                <a href='/'>Don’t have an account? Register</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Login