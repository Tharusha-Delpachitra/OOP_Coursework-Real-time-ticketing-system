import React from 'react'
import ConfigurationForm from "../components/ConfigurationForm"
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import PreviousConfig from '../components/PreviousConfig'

const ConfigPage = () => {
  return (
    <>
    <NavBar/>
    <div className='flex flex-col items-center lg:flex-row lg:items-start justify-center gap-5'>
        <ConfigurationForm/>
        <PreviousConfig/>
    </div>
    
    <Footer/>
    </>

  )
}

export default ConfigPage