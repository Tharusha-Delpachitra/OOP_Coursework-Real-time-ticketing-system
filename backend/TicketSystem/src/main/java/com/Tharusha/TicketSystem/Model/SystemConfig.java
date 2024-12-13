package com.Tharusha.TicketSystem.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

/**
 * Represents the system configuration for the ticketing system.
 * This entity is mapped to a database table for persistence.
 */
@Entity
public class SystemConfig {

    //Unique identifier for the system configuration (usually set to 1).
    @Id
    private int id = 1;

    private int totalTickets;
    private int ticketReleaseRate;
    private int customerRetrievalRate;
    private int maximumTicketCapacity;
    private int noOfVendors;
    private int noOfCustomers;
    private int quantity;

    /**
     * Default constructor.
     */
    public SystemConfig() {}

    public void setId(int id) {
        this.id = id;
    }

    public int getTotalTickets() {
        return totalTickets;
    }

    public void setTotalTickets(int totalTickets) {
        this.totalTickets = totalTickets;
    }

    public int getTicketReleaseRate() {
        return ticketReleaseRate;
    }

    public void setTicketReleaseRate(int ticketReleaseRate) {
        this.ticketReleaseRate = ticketReleaseRate;
    }

    public int getCustomerRetrievalRate() {
        return customerRetrievalRate;
    }

    public void setCustomerRetrievalRate(int customerRetrievalRate) {
        this.customerRetrievalRate = customerRetrievalRate;
    }

    public int getMaximumTicketCapacity() {
        return maximumTicketCapacity;
    }

    public void setMaximumTicketCapacity(int maximumTicketCapacity) {
        this.maximumTicketCapacity = maximumTicketCapacity;
    }

    public int getNoOfVendors() {
        return noOfVendors;
    }

    public void setNoOfVendors(int noOfVendors) {
        this.noOfVendors = noOfVendors;
    }

    public int getNoOfCustomers() {
        return noOfCustomers;
    }

    public void setNoOfCustomers(int noOfCustomers) {
        this.noOfCustomers = noOfCustomers;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
