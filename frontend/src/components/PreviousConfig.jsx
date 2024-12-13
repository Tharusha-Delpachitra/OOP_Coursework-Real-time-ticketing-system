import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify'

/**
 * The PreviousConfig component fetches and displays the previous system configuration details.
 * It allows the user to load the system with the previous configuration, if available.
 *
 */
const PreviousConfig = () => {
  const [previousConfig, setPreviousConfig] = useState(null);
  const navigate = useNavigate();

  /**
   * Fetches the previous configuration details from the backend API.
   * If the request is successful, it updates the state with the configuration data.
   * If an error occurs, it logs the error to the console.
   *
   */
  const fetchConfigDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8080/ticketSystem/config/getConfig");
      console.log("API Response:", response.data);
      setPreviousConfig(response.data);
     
    } catch (error) {
      console.log("Error while fetching details", error);
    }
  };

 /**
   * useEffect hook that runs on initial render to fetch the previous configuration details.
   * It ensures that the configuration is fetched only once when the component is mounted.
   */
  useEffect(() => {
    fetchConfigDetails();
  }, []);

   /**
   * Navigates to the "/System" page if configuration details are available.
   * If no configuration data is found, it shows an error toast message.
   *
   */
  const navigateToPage = () => {

    if (!previousConfig) {
      toast.error("Please configure the system. No data stored");
    } else {
       navigate("/System"); 
      toast.success('System loaded with previous configuration');
    } 
  };

  return (
    <div className='border border-gray-400 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col gap-8 w-80 sm:w-100 bg-white h-100'>
      <h1 className='text-base sm:text-xl font-bold'>Previous Configuration Details</h1>
      <div>
        {previousConfig ? (
          <div className='text-sm sm:text-lg flex flex-col gap-7'>
            <h1><span className='font-semibold'>Total Tickets :</span> {previousConfig.totalTickets}</h1>
            <h1><span className='font-semibold'>Ticket Release Rate :</span> {previousConfig.ticketReleaseRate}</h1>
            <h1><span className='font-semibold'>Customer Retrieval Rate :</span> {previousConfig.customerRetrievalRate}</h1>
            <h1><span className='font-semibold'>Maximum Ticket Capacity :</span> {previousConfig.maximumTicketCapacity}</h1>
            <h1><span className='font-semibold'>No.of Vendors :</span> {previousConfig.noOfVendors}</h1>
            <h1><span className='font-semibold'>No.of Customers :</span> {previousConfig.noOfCustomers}</h1>
            <h1><span className='font-semibold'>Quantity of tickets Customer can buy:</span> {previousConfig.quantity}</h1>

          </div>
        ) : (
          <p>Loading configuration details...</p>
        )}
      </div>
      <p className='text-sm sm:text-base text-red-600'>Can use the above configuration details to start the simulation if you like</p>
      <button
        onClick={navigateToPage}
        className="bg-slate-600 text-white font-semibold rounded-xl p-2 text-sm sm:text-lg hover:bg-slate-800"
      >
        USE PREVIOUS CONFIGURATION
      </button>
    </div>
  );
};

export default PreviousConfig;


