import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const TicketLogs = () => {

  const [logs, setLogs] = useState([]); // State to hold the fetched logs
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To handle any errors

  // Fetch logs from the backend when the component mounts
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/tickets/logs'); // Replace with your actual backend URL
        setLogs(response.data); // Update the logs state with the fetched logs
        setLoading(false); // Stop loading once the logs are fetched
      } catch (error) {
        setError('Failed to fetch logs');
        setLoading(false);
      }
    };

    fetchLogs();

     // Set up polling with a 1-second interval
     const interval = setInterval(fetchLogs, 1000);

     // Cleanup the interval on component unmount
     return () => clearInterval(interval);
     
  }, []); // Empty dependency array means this effect runs only once when the component mounts


  return (
    <div className="border border-gray-400 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 bg-white flex flex-col gap-8">
      <h1 className="text-center text-xl font-bold">Ticket System Logs</h1>
      
      {/* Display logs */}
      <div className="overflow-y-auto max-h-96">
        {logs.length === 0 ? (
          <p className='text-red-600 text-2xl font-bold text-center'>No logs available yet start the Ticketing System</p>
        ) : (
          <ul className="list-none space-y-2 bg-gray-200">
            {logs.map((log, index) => (
              <li key={index} className="border-b border-black p-2 text-sm md:text-lg font-semibold sm:text-center">{log}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TicketLogs