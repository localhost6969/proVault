import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/Navbar'
import { Router, Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/login/Login'
function App() {
  return (
    <div className='relative'>
      
        <NavBar/>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </div>
  )
}

export default App
