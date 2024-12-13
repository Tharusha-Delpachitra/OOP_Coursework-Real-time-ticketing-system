package com.Tharusha.TicketSystem.DTO;


import java.util.concurrent.atomic.AtomicInteger;

/**
 * Data Transfer Object (DTO) representing analytic data for the ticket system.
 */
public class AnalyticDataDTO {

    private AtomicInteger totalTickets;
    private int noOfVendors;
    private int noOfCustomers;

    /**
     * Default constructor.
     */
    public AnalyticDataDTO() {}

    /**
     * Sets the total number of tickets processed.
     *
     * @param totalTickets the total number of tickets
     */
    public void setTotalTickets(AtomicInteger totalTickets) {
        this.totalTickets = totalTickets;
    }

    /**
     * Sets the number of vendor threads.
     *
     * @param noOfVendors the number of vendor threads
     */
    public void setNoOfVendors(int noOfVendors) {
        this.noOfVendors = noOfVendors;
    }

    /**
     * Sets the number of customer threads.
     *
     * @param noOfCustomers the number of customer threads
     */
    public void setNoOfCustomers(int noOfCustomers) {
        this.noOfCustomers = noOfCustomers;
    }

    public AtomicInteger getTotalTickets() {
        return totalTickets;
    }

    public int getNoOfVendors() {
        return noOfVendors;
    }

    public int getNoOfCustomers() {
        return noOfCustomers;
    }
}
