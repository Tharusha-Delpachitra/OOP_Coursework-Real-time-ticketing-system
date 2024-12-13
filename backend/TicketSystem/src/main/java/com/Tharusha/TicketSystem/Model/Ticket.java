package com.Tharusha.TicketSystem.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

/**
 * Represents a ticket in the ticketing system.
 * This entity is mapped to a database table for persistence.
 */
@Entity
public class Ticket {

    @Id
    private int ticketId;

    private String ticketName;
    private double price;
    private String addedByVendor;

    /**
     * Default constructor.
     */
    public Ticket() {}

    /**
     * Constructor to create a ticket with all properties.
     *
     * @param ticketId      unique identifier for the ticket
     * @param ticketName    name of the event or ticket
     * @param price         price of the ticket
     * @param addedByVendor name of the vendor who added the ticket
     */
    public Ticket(int ticketId, String ticketName, double price, String addedByVendor) {
        this.ticketId = ticketId;
        this.ticketName = ticketName;
        this.price = price;
        this.addedByVendor = addedByVendor;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "ticketId=" + ticketId +
                ", ticketName='" + ticketName + '\'' +
                ", price=" + price +
                ", addedByVendor='" + addedByVendor +
                '}';
    }
}