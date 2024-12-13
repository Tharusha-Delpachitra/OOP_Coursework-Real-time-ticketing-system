import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

/**
 * The ConfigurationForm component allows the user to configure the ticket system.
 * It collects values for total tickets, ticket release rate, customer retrieval rate,
 * and maximum ticket capacity, then submits them to the server.
 *
 */
const ConfigurationForm = () => {
  const [totalTickets, setTotalTickets] = useState("");
  const [ticketReleaseRate, setTicketReleaseRate] = useState("");
  const [customerRetrievalRate, setCustomerRetrievalRate] = useState("");
  const [maximumTicketCapacity, setMaximumTicketCapacity] = useState("");

  const [noOfVendors, setNoOfVendors] = useState("");
  const [noOfCustomers, setNoOfCustomers] = useState("");
  const [quantity, setQuantity] = useState("");

  const [vendorError, setVendorError] = useState("");
  const [customerError, setCustomerError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [ticketReleaseRateError, setTicketReleaseRateError] = useState("");
  const [customerRetrievalRateError, setCustomerRetrievalRateError] = useState("");
  
  const navigate = useNavigate();

  /**
   * Handles form submission.
   * Sends the form data to the backend to configure the system.
   * @param {object} e the event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert inputs to numbers for comparison
    const totalTicketsNum = parseInt(totalTickets);
    const vendorsNum = parseInt(noOfVendors);
    const maximumCapacityNum = parseInt(maximumTicketCapacity);

    if (ticketReleaseRate > 10) {
      setTicketReleaseRateError("Ticket release rate cannot exceed 10");
      return;
    }

    if (customerRetrievalRate > 10) {
      setCustomerRetrievalRateError("Customer retrieval rate cannot exceed 10");
      return;
    }

    // Validate inputs before submission
    if (noOfVendors > 50) {
      setVendorError("Number of vendors cannot exceed 50");
      return; // Stop submission
    }

    if (noOfCustomers > 50) {
      setCustomerError("Number of customers cannot exceed 50");
      return; // Stop submission
    }

    if (quantity > 5) {
      setQuantityError(
        "Number of ticket quantity customer can buy cannot exceed 50"
      );
      return; // Stop submission
    }

    if (maximumCapacityNum < vendorsNum * totalTicketsNum) {
      toast.error(
        `Maximum capacity should be greater than ${
          vendorsNum * totalTicketsNum
        }.`
      );
      return; // Stop submission
    }

    const configData = {
      totalTickets,
      ticketReleaseRate,
      customerRetrievalRate,
      maximumTicketCapacity,
      noOfVendors,
      noOfCustomers,
      quantity
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/ticketSystem/config/update",
        configData
      );

      if (response.status === 200) {
        console.log("Configuration successful..");
        navigate("/System");
        toast.success("System configured successfully");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log("Bad Request Error:", error.response);
          toast.error("Integers Required. Please check the provided data.");
        } else if (error.response.status === 500) {
          console.log("Server Error:", error.response);
          toast.error("Internal server error. Please try again later.");
        } else {
          console.log("Error Response:", error.response);
          toast.error("An error occurred on the server.");
        }
      } else if (error.request) {
        console.log("Error Request:", error.request);
        toast.error("No response from the server. Please try again later.");
      } else {
        console.log("Error Message:", error.message);
        toast.error("Request error");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border border-gray-400 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 bg-white w-80 sm:w-100 h-100"
      >
        <div className="text-base sm:text-xl font-bold">
          Configure the Ticket System
        </div>

        <div className="flex flex-col">
          <label className="text-sm sm:text-base">Total No.of tickets a vendor can add: </label>
          <input
            type="text"
            placeholder="Enter the total tickets"
            className="border border-black p-1 rounded-lg"
            required
            value={totalTickets}
            onChange={(e) => setTotalTickets(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm sm:text-base">Ticket Release Rate :</label>
          <input
            type="text"
            placeholder="Enter the ticket release rate"
            className="border border-black p-1 rounded-lg"
            required
            value={ticketReleaseRate}
            onChange={(e) => {
              const value = e.target.value;
              if (value > 10) {
                setTicketReleaseRateError(
                  "Ticket release rate cannot exceed 10"
                );
              } else {
                setTicketReleaseRateError("");
              }
              setTicketReleaseRate(value);
            }}
          />
          {ticketReleaseRateError && (
            <p className="text-red-500 text-sm">{ticketReleaseRateError}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm sm:text-base">Customer Retrieval Rate :</label>
          <input
            type="text"
            placeholder="Enter the No.of vendors"
            className="border border-black  p-1 rounded-lg"
            required
            value={customerRetrievalRate}
            onChange={(e) => {
              const value = e.target.value;
              if (value > 10) {
                setCustomerRetrievalRateError(
                  "Customer Rertieval rate cannot exceed 10"
                );
              } else {
                setCustomerRetrievalRateError("");
              }
              setCustomerRetrievalRate(value);
            }}
          />
          {customerRetrievalRateError && (
            <p className="text-red-500 text-sm">{customerRetrievalRateError}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm sm:text-base">Maximum Ticket Capacity :</label>
          <input
            type="text"
            placeholder="Enter the maximum ticket capacity"
            className="border border-black  p-1 rounded-lg"
            required
            value={maximumTicketCapacity}
            onChange={(e) => setMaximumTicketCapacity(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm sm:text-base">No.of Vendors :</label>
          <input
            type="text"
            placeholder="Enter the No.of vendors"
            className="border border-black  p-1 rounded-lg"
            required
            value={noOfVendors}
            onChange={(e) => {
              const value = e.target.value;
              if (value > 50) {
                setVendorError("Number of vendors cannot exceed 50");
              } else {
                setVendorError("");
              }
              setNoOfVendors(value);
            }}
          />
          {vendorError && <p className="text-red-500 text-sm">{vendorError}</p>}
        </div>
        <div className="flex flex-col">
          <label className="text-sm sm:text-base">No.of Customers :</label>
          <input
            type="text"
            placeholder="Enter the No.of customers"
            className="border border-black  p-1 rounded-lg"
            required
            value={noOfCustomers}
            onChange={(e) => {
              const value = e.target.value;
              if (value > 50) {
                setCustomerError("Number of customers cannot exceed 50");
              } else {
                setCustomerError("");
              }
              setNoOfCustomers(value);
            }}
          />
          {customerError && (
            <p className="text-red-500 text-sm">{customerError}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm sm:text-base">Quantity of tickets customer can buy :</label>
          <input
            type="text"
            placeholder="Enter the Quantity of tickets "
            className="border border-black  p-1 rounded-lg"
            required
            value={quantity}
            onChange={(e) => {
              const value = e.target.value;
              if (value > 5) {
                setQuantityError("Quantity cannot exceed 5");
              } else {
                setQuantityError("");
              }
              setQuantity(value);
            }}
          />
          {quantityError && (
            <p className="text-red-500 text-sm">{quantityError}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold rounded-xl p-2 text-sm sm:text-lg hover:bg-blue-800"
        >
          CONFIGURE
        </button>
      </form>
    </>
  );
};

export default ConfigurationForm;
