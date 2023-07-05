import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import Home from "./pages/Home";
import ViewWallet from "./pages/ViewWallet";
import FriendProfile from "./pages/FriendProfile";
import MyProfile from "./pages/MyProfile";
import PrivacyAndSecurity from "./pages/PrivacyAndSecurity";
import HelpAndSupport from "./pages/HelpAndSupport";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import StableDiffusion from "./pages/StableDiffusion";
import { AuthContext } from "./context/AuthContext";
// import Messenger from "./pages/MessengerScreen";
import Messenger from "./pages/Messenger";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={user ? <Home /> : <Login />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/wallet"
          element={user ? <ViewWallet /> : <Login />}
        />
        <Route
          exact
          path="/otherprofile"
          element={user ? <FriendProfile /> : <Login />}
        />
        <Route
          exact
          path="/profile"
          element={user ? <MyProfile /> : <Login />}
        />
        <Route
          exact
          path="/privacy-and-security"
          element={user ? <PrivacyAndSecurity /> : <Login />}
        />
        <Route
          exact
          path="/help-and-support"
          element={user ? <HelpAndSupport /> : <Login />}
        />
        <Route
          exact
          path="/feedback"
          element={user ? <Feedback /> : <Login />}
        />
        <Route
          exact
          path="/ai"
          element={user ? <StableDiffusion /> : <Login />}
        />
        <Route
          exact
          path="/messages"
          element={user ? <Messenger /> : <Home />}
        />

        {/* <Route path="/messenger">{!
        

        ? <Home /> : <Messenger />}</Route> */}

        <Route exact path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </Router>
  );
}

export default App;
