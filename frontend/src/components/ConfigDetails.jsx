import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * The ConfigDetails component fetches and displays the configuration details of the ticket system.
 * It makes an API request to retrieve the current configuration and displays it.
 *
 */
const ConfigDetails = () => {
  const [previousConfig, setPreviousConfig] = useState(null);

  /**
   * Fetches the configuration details from the backend.
   * Sends a GET request to the server and updates the state with the response data.
   * If the request fails, logs the error to the console.
   *
   */
  const fetchConfigDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/ticketSystem/config/getConfig"
      );
      console.log("API Response:", response.data);
      setPreviousConfig(response.data);
    } catch (error) {
      console.log("Error while fetching details", error);
    }
  };

  useEffect(() => {
    fetchConfigDetails();
  }, []);

  return (
    <div className="border border-gray-400 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 px-4 sm:px-14 flex flex-col gap-8 bg-white w-80 sm:w-full mx-auto">
      <h1 className="text-xl font-bold text-center mb-5">
        Configuration Details
      </h1>
      <div>
        {previousConfig ? (
          <div className="text-base sm:text-lg flex flex-col gap-7">
            <h1>
              <span className="font-semibold">Total Tickets added by a vendor:</span>{" "}
              {previousConfig.totalTickets}
            </h1>
            <h1>
              <span className="font-semibold">Ticket Release Rate :</span>{" "}
              {previousConfig.ticketReleaseRate}
            </h1>
            <h1>
              <span className="font-semibold">Customer Retrieval Rate :</span>{" "}
              {previousConfig.customerRetrievalRate}
            </h1>
            <h1>
              <span className="font-semibold">Maximum Ticket Capacity :</span>{" "}
              {previousConfig.maximumTicketCapacity}
            </h1>
            <h1>
              <span className="font-semibold">Quantity of ticket customer can buy:</span>{" "}
              {previousConfig.quantity}
            </h1>
          </div>
        ) : (
          <p>Loading configuration details...</p>
        )}
      </div>
    </div>
  );
};

export default ConfigDetails;
