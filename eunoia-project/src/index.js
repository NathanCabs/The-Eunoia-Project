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
import CreatePost from './CreatePost';
import Admin from './Admin';
import ForgotPass from './ForgotPass';
import reportWebVitals from './reportWebVitals';
import PostDetail from './PostDetail';
import ProfessionalDetail from './ProfessionalDetail';
import AddComment from './AddComment';
import ProfessionalBooking from './ProfessionalBooking';
import ProfessionalProfile from './ProfessionalProfile';
import MyBooking from './MyBooking';
import { ResourceProvider } from './ResourceContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ResourceProvider>
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
        <Route path="/admin" element={<Admin />} />
        <Route path="/forgot_password" element={<ForgotPass />} />
        <Route path="/professional-detail/:id" element={<ProfessionalDetail />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/add" element={<AddComment />} />
        <Route path="/professional-booking/" element={<ProfessionalBooking />} />
        <Route path="/professional-profile/" element={<ProfessionalProfile />} />
        <Route path="/my-booking/:id" element={<MyBooking />} />
      </Routes>
    </BrowserRouter>
  </ResourceProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
