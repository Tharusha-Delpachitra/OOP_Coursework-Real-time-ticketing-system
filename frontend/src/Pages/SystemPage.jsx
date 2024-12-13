import React from 'react'

import ControlPanel from "../components/ControlPanel"
import NavBar from "../components/NavBar"
import TicketDisplay from "../components/TicketDisplay"
import TicketLogs from "../components/TicketLogs"
import Footer from '../components/Footer'
import AnaliticData from '../components/AnaliticData'
import ConfigDetails from '../components/ConfigDetails'

const SystemPage = () => {
  return (
    <>
      <NavBar />

      <div className="grid grids-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-5 md:px-14 gap-5 mb-10">
          <ControlPanel />
       
          <AnaliticData />

          <ConfigDetails/>
      </div>

      <div className='px-5 md:px-14'>
          <TicketLogs />
      </div>
    
      <div className="px-5 md:px-14">
        <TicketDisplay />
      </div>

      <Footer />
    </>
  )
}

export default SystemPage
