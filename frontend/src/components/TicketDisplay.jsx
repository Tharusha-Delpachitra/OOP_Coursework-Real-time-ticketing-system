import React from 'react'
import Ticket from '../assets/Ticket.png'
import { useState, useEffect } from 'react' 
import axios from 'axios'

const TicketDisplay = () => {

  const [ tickets, setTickets ] = useState([]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tickets/tickets");
      setTickets(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    fetchTickets();

      // Set up polling with a 1-second interval
      const interval = setInterval(fetchTickets, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);

  }, []);

  return (
    <div className='py-10 px-4 sm:px-8 mt-10 border border-gray-400 shadow-xl hover:shadow-2xl transition-all duration-300'>
      <div className='text-xl md:text-2xl font-bold'>
        Remaining Available Tickets in the Pool
        
        {tickets.length === 0 ? (
            <p className='text-red-600 text-2xl font-bold text-center mt-6'>No Tickets available</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8'>
              {tickets.map((ticket) => (
                <div
                  key={ticket.ticketId}
                  className="border border-gray-300 shadow-lg hover:shadow-xl flex flex-col gap-2 p-4 transition-all duration-300 bg-white"
                >
                  <img src={Ticket} alt="ticket" className="w-40 mx-auto" />
                  <hr className="border-2 border-black" />
                  <h1 className="text-base">Ticket Id: {ticket.ticketId}</h1>
                  <h1 className="text-base">Event Name: {ticket.ticketName}</h1>
                  <h2 className="text-base">Price: ${ticket.price}</h2>
                  <h2 className="text-base">Added By: {ticket.addedByVendor}</h2>
                </div>
              ))}
            </div>
          )}
          
      </div>
    </div>
    
  )
}

export default TicketDisplay