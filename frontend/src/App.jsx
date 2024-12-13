import React from "react"
import { Routes, Route } from 'react-router-dom'
import ConfigPage from './Pages/ConfigPage'
import SystemPage from './Pages/SystemPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
    <ToastContainer position="top-left" autoClose={3000}/>
    <Routes>
      <Route path='/' element={<ConfigPage/>}/>
      <Route path='/System' element={<SystemPage/>}/>
    </Routes>
      
    </>
  )
}

export default App
