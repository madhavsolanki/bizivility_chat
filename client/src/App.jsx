/* eslint-disable no-unused-vars */
import React from 'react';
import {Navigate, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import getCurrentUser from './hooks/getCurrentUser';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Profile from './pages/Profile';

const App = () => {
  getCurrentUser();
  let {userData} = useSelector(state => state.user);
  return (
  <Routes>
    <Route path='/login' element={<Login/> }/>
    <Route path='/signup' element={<Signup/> }/>
    <Route path='/' element={ <Home/>}/>
    <Route path='/profile' element={<Profile/> }/>
  </Routes>
  )
};

export default App;