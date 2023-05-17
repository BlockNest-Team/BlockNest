import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/wallet" element={<ViewWallet />} />
        <Route
          exact
          path="/profile/:walletaddress"
          element={<FriendProfile />}
        />
        <Route exact path="/myprofile" element={<MyProfile />} />
        <Route
          exact
          path="/privacy-and-security"
          element={<PrivacyAndSecurity />}
        />
        <Route exact path="/help-and-support" element={<HelpAndSupport />} />
        <Route exact path="/feedback" element={<Feedback />} />
        <Route exact path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </Router>
  );
}

export default App;
