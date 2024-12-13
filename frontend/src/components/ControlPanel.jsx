import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'

/**
 * The ControlPanel component provides functionality to start, stop, reset, and configure the system.
 * It interacts with the backend API to control the system.
 * 
 */
const ControlPanel = () => {
    const [isStarted, setIsStarted] = useState(false); // Correct initial state
    const navigate = useNavigate();

    /**
     * Starts the system by sending a POST request to the backend.
     * If the request is successful, updates the state and shows a success notification.
     * If the request fails, shows an error toast notification.
     *
     */
    const handleStart = async () => {
      try {
        const response = await axios.post('http://localhost:8080/tickets/start');
  
        if (response.status === 200) {
          console.log("Threads started");
          toast.success("System started successfully");
          setIsStarted(true); // Correctly updating the state
        }
      } catch (error) {
        console.error("Error starting system:", error);
        toast.error("Failed to start the system");
      }
    };
    
    /**
     * Stops the system by sending a POST request to the backend.
     * If the system is started, the request stops the system and updates the state.
     * If the system is not started, shows an error notification.
     *
     */
    const handleStop = async () => {
      if (isStarted === true) { // Check if the system has started
        try {
          const response = await axios.post('http://localhost:8080/tickets/stop');
  
          if (response.status === 200) {
            console.log("Threads stopped");
            toast.success("System stopped successfully");
            setIsStarted(false); // Correctly updating the state
          }
        } catch (error) {
          console.error("Error stopping system:", error);
          toast.error("Failed to stop the system");
        }
      } else {
        toast.error("System is not started yet!");
      }
    };
    
    /**
     * Resets the system by sending a POST request to the backend.
     * If successful, shows a success notification.
     * If it fails, shows an error toast notification.
     *
     */
    const handleReset = async () => {
        try {
          const response = await axios.post('http://localhost:8080/tickets/reset');
  
          if (response.status === 200) {
            console.log("System reset successfully");
            toast.success("System reset successfully");
          }
        } catch (error) {
          console.error("Error resetting system:", error);
          toast.error("Failed to reset the system");
        }
    };

    /**
    * Navigates to the configuration page and resets the system.
    * 
    */
    const handleConfig = async () => {
        
        navigate("/");
        handleReset();
    }

  return (
    <div className='border border-gray-400 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col gap-8 bg-white  w-80 sm:w-full mx-auto'>
        <h1 className='text-center text-xl font-bold mb-5'>Control Panel</h1>
    
        <button onClick={handleStart} className='bg-slate-600 text-white text-lg font-semibold p-2 rounded-xl hover:bg-slate-700'>
            START
        </button>   
        <button onClick={handleStop} className='bg-red-600 p-2 px-8 text-white text-lg font-bold mx-auto rounded-xl w-full hover:bg-red-700'>
            STOP
        </button>
        <button onClick={handleReset} className='bg-blue-600 p-2 px-8 text-white text-lg font-bold mx-auto rounded-xl w-full hover:bg-blue-700'>
            RESET
        </button>
        <button onClick={handleConfig} className='bg-blue-800 p-2 px-8 text-white text-lg font-bold mx-auto rounded-xl w-full hover:bg-blue-900'>
            CONFIGURE SYSTEM
        </button>

    </div>
  )
}

export default ControlPanel