import React from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Footer from './Components/Footer'
import Projects from './Components/Projects'
import Contact from './Components/Contact'
import Resume from './Components/Resume'

function App() {
  return (

    <div className='app'>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/projects' element={<Projects/>}></Route>
          <Route path='/resume' element={<Resume/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>

  )
}

export default App