import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import Login from './Login';
import Register from './Register';
import TakeTest from './TakeTest';
import Test from './Test';
import Home from './Home';
import Professionals from './Professionals';
import Profile from './Profile';
import Resources from './Resources';
import Message from './Message';
import CreatePost from './CreatePost';
import Admin from './Admin';
import ForgotPass from './ForgotPass';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/taketest" element={<TakeTest />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/professionals" element={<Professionals />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/message" element={<Message />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/forgot_password" element={<ForgotPass />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
