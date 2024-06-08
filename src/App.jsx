import React, { useContext, useEffect } from 'react'
import "./App.css" 
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Home from "./pages/Home.jsx";
import Appointment from "./pages/Appointment.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Footer from "./components/Footer.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar.jsx';
import { Context } from './main.jsx';
import axios from 'axios';

const App = () => {
  useEffect(()=>{
    const script=document.createElement("script");
    script.src="https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    return ()=>{}
  },[])
  const {isAuthenticated,setIsAuthenticated,setUser}=useContext(Context);
  useEffect(()=>{
    const fetchUser=async()=>{
      try{
        const response= await axios.get("https://hms-backend-deployment-alpj.onrender.com/api/v1/user/patient/me",{withCredentials: true});
        setIsAuthenticated(true);
        setUser(response.data.user);
      }catch(error){
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  },[isAuthenticated]);
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/appointment' element={<Appointment/>}/>
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        <Footer/>
        <ToastContainer position='top-center'/>
      </Router>

    </>
  )
}

export default App