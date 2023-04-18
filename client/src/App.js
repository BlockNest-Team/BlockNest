import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

import { useContext, useState } from "react";
import { Web3Context, Web3Provider } from "./Web3Context.js";

function App() {
  /*********integration of metamask to app */
  // const { isConnected } = useContext(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleRegister = () => {
    setLoggedIn(true);
  };

  const handleLogin = (walletAddress) => {
    setWalletAddress(walletAddress);
    alert(walletAddress);
    setLoggedIn(true);
  };

  const handleConnectWallet = async () => {
    try {
      await window.ethereum.enable();
      setLoggedIn(true);
      setWalletAddress(window.ethereum.selectedAddress);
    } catch (error) {
      console.log(error);
    }
  };

  /**************end integration */

  return (
    <Web3Provider>
      <div className="App">
        <>
          {!loggedIn ? (
            <>
              <Signup onRegister={handleRegister} />
              <Login onLogin={handleLogin} />
            </>
          ) : (
            <Home />
          )}
        </>
      </div>
      {/* <Home /> */}
    </Web3Provider>
  );
}

export default App;
