import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; 
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Register necessary Chart.js components and the plugin
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const AnaliticData = () => {

  // State to store analytics data
  const [analyticsData, setAnalyticsData] = useState({
    totalTickets: 0,
    noOfVendors: 0,
    noOfCustomers: 0,
  });

  const [ isStarted, setIsStarted ] = useState(false);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('http://localhost:8080/tickets/analytics');
        if (response.status === 200) {
          const { totalTickets, noOfVendors, noOfCustomers } = response.data;

          // Check if there is valid data
          if (totalTickets > 0 || noOfVendors > 0 || noOfCustomers > 0) {
            setAnalyticsData(response.data); // Update state with the fetched data
            setIsStarted(true); // Show the pie chart
          } else {
            setIsStarted(false); // No data available
          }
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();

     // Set up polling with a 10-second interval
     const interval = setInterval(fetchAnalytics, 1000);

     // Cleanup the interval on component unmount
     return () => clearInterval(interval);

  }, []); // Empty dependency array ensures this runs once on component mount

  const pieData = {
    labels: ['No.of Vendors', 'No.of Customers' , 'No.of Tickets'], // Names for the legend
    datasets: [
      {
        label: 'Count',
        data: [analyticsData.noOfVendors, analyticsData.noOfCustomers, analyticsData.totalTickets],
        backgroundColor: ['#dc2626', '#2563eb', '#22c55e'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      datalabels: {
        color: '#fff', // Text color
        font: {
          size: 20, // Font size for numbers
        },
        formatter: (value, context) => {
          return value; // Display the raw value
        },
      },
    },
  };

  return (
    <div className='border border-gray-400 shadow-xl hover:shadow-2xl transition-all duration-300 py-8 px-5 w-80 sm:w-full mx-auto '>
      <h2 className='text-center text-xl font-bold mb-4'>System Analytics</h2>
      {isStarted === true ? (<Pie data={pieData} options={options} />) : (<p className='text-red-600 font-bold text-xl text-center mt-20'>No data Available please Start the system</p>)}
      
    </div>
  );
};

export default AnaliticData;
