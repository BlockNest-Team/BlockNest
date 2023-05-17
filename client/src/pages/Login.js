import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/login-signup.scss";
import Navbar from "../components/navbar.js";
import { getWeb3, getBlockNestContract } from "../utils/blockNestContract";

const Login = () => {
  const [status, setStatus] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    const checkWalletConnected = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      setWalletConnected(accounts.length > 0);

      // Listen for account changes
      web3.currentProvider.on("accountsChanged", async function (accounts) {
        setWalletConnected(accounts.length > 0);
      });
    };

    checkWalletConnected();
  }, []);

  const login = async () => {
    try {
      setStatus("Logging in...");
      const web3 = await getWeb3();
      const contract = await getBlockNestContract(web3);
      const accounts = await web3.eth.getAccounts();
      const userExists = await contract.methods.userExists(accounts[0]).call();

      if (userExists) {
        setStatus("Login successful!");
        navigateToHome();
      } else {
        // setStatus("User does not exist. Please register first.");
        alert("User does not exist. Please register first.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setStatus("Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex-justify-center">
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
                <div className="profile-pic none">
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="profile-pic"
                  />
                </div>

                <div className="profile-name none">
                  <p>John Doe</p>
                </div>

                <div className="btn-container login-btn">
                  <button
                    className={`btn ${!walletConnected ? "disabled" : ""}`}
                    onClick={login}
                    disabled={!walletConnected || status === "Logging in..."}
                  >
                    {status === "Logging in..."
                      ? "Logging in..."
                      : status || "Authorize Login"}
                  </button>
                </div>
                <div className="redirect">
                  <a href="/register">Don’t have an account? Register</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/pages/login-signup.scss";
// import Navbar from "../components/navbar.js";
// import { getWeb3, getBlockNestContract } from "../utils/blockNestContract";

// const Login = () => {
//   // Implementation of Login and connecting it to contract function starts here

//   const [status, setStatus] = useState("");
//   const navigate = useNavigate();
//   const navigateToHome = () => {
//     navigate("/home");
//   };

//   const login = async () => {
//     try {
//       setStatus("Logging in...");
//       const web3 = await getWeb3();
//       const contract = await getBlockNestContract(web3);
//       const accounts = await web3.eth.getAccounts();
//       const userExists = await contract.methods.userExists(accounts[0]).call();

//       if (userExists) {
//         setStatus("Login successful!");
//         navigateToHome();
//       } else {
//         setStatus("User does not exist. Please register first.");
//         alert("User does not exist. Please register first.")
//       }
//     } catch (error) {
//       console.error("Error during login:", error.message);
//       setStatus("Login failed");
//     }
//   };

//   // Implementation of Login and connecting it to contract function ends here

//   return (
//     <>
//       <Navbar />
//       <div className="d-flex-justify-center">
//         <div className="login-container ">
//           <div className="app-name">
//             <h1>BlockNest</h1>
//           </div>
//           <div className="card ">
//             <div className="login-content d-flex-align-center d-flex-col">
//               <div className="login-heading ">
//                 <h1>Login</h1>
//               </div>
//               <div className="login-profile-details d-flex-center d-flex-col">
//                 <div className="profile-pic">
//                   <img
//                     src="https://www.w3schools.com/howto/img_avatar.png"
//                     alt="profile-pic"
//                   />
//                 </div>

//                 <div className="profile-name">
//                   <p>John Doe</p>
//                 </div>

//                 <div className="btn-container">
//                   <button
//                     className="btn"
//                     onClick={login} // onClick of this button, which is logging in
//                     disabled={status === "Logging in..."} // Disable the button while logging in
//                   >
//                     {status === "Logging in..."
//                       ? "Logging in..."
//                       : status || "Authorize Login"}
//                   </button>
//                 </div>
//                 {/* {status && status !== "Logging in..." && (
//                   <p className="status-message">
//                     Status: {status}
//                   </p>
//                 )} */}
//                 <div className="redirect">
//                   <a href="/signup">Don’t have an account? Register</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/pages/login-signup.scss";
// import Navbar from "../components/navbar.js";
// import { getWeb3, getBlockNestContract } from "../utils/blockNestContract";

// const Login = () => {
//   const [status, setStatus] = useState("");
//   const [walletConnected, setWalletConnected] = useState(false);
//   const navigate = useNavigate();
//   const navigateToHome = () => {
//     navigate("/home");
//   };

//   useEffect(() => {
//     const checkWalletConnected = async () => {
//       const web3 = await getWeb3();
//       const accounts = await web3.eth.getAccounts();
//       setWalletConnected(accounts.length > 0);
//     };

//     checkWalletConnected();
//   }, []);

//   const login = async () => {
//     try {
//       setStatus("Logging in...");
//       const web3 = await getWeb3();
//       const contract = await getBlockNestContract(web3);
//       const accounts = await web3.eth.getAccounts();
//       const userExists = await contract.methods.userExists(accounts[0]).call();

//       if (userExists) {
//         setStatus("Login successful!");
//         navigateToHome();
//       } else {
//         setStatus("User does not exist. Please register first.");
//         alert("User does not exist. Please register first.");
//       }
//     } catch (error) {
//       console.error("Error during login:", error.message);
//       setStatus("Login failed");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="d-flex-justify-center">
//         <div className="login-container">
//           {/* ... */}
//           <div className="login-content d-flex-align-center d-flex-col">
//             {/* ... */}
//             <div className="btn-container">
//               <button
//                 className={`btn ${!walletConnected ? "disabled" : ""}`}
//                 onClick={login}
//                 disabled={!walletConnected || status === "Logging in..."}
//               >
//                 {status === "Logging in..."
//                   ? "Logging in..."
//                   : status || "Authorize Login"}
//               </button>
//             </div>
//             {/* ... */}
//           </div>
//           {/* ... */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
