import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
// import App from './App';
// import Login from './screens/Login';
import Signup from './screens/Signup';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Login /> */}

    <Signup />
  </React.StrictMode>
);

