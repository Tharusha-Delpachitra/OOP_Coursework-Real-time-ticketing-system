package com.Tharusha.TicketSystem.Model;

import com.Tharusha.TicketSystem.Controller.ThreadController;
import com.Tharusha.TicketSystem.Service.TicketPoolService;

import java.util.concurrent.atomic.AtomicInteger;

public class Vendor implements Runnable {

    private final TicketPoolService ticketPoolService;
    private final int totalTickets;
    private final int ticketReleaseRate;
    private final ThreadController threadController;

    // Shared static counter for ticket IDs
    private static AtomicInteger ticketIdCounter = new AtomicInteger(0);

    /**
     * Constructs a new Vendor object.
     *
     * @param ticketPoolService   the ticket pool service
     * @param totalTickets     the total number of tickets the vendor can add
     * @param ticketReleaseRate the rate at which tickets are released
     * @param threadController   the thread controller to check simulation status
     */
    public Vendor(TicketPoolService ticketPoolService, int totalTickets, int ticketReleaseRate, ThreadController threadController) {
        this.ticketPoolService = ticketPoolService;
        this.totalTickets = totalTickets;
        this.ticketReleaseRate = ticketReleaseRate;
        this.threadController = threadController;
    }

    /**
     * The main execution method of the vendor thread.
     * It adds tickets to the pool at the specified rate according to the for loop validation.
     */
    @Override
    public void run() {
        for (int i = 0; i < totalTickets; i++) {
            if (!threadController.isRunning()) {
                break;
            }

            Ticket ticket = new Ticket(ticketIdCounter.getAndIncrement() + 1, "Event Horizon", 20, Thread.currentThread().getName());
            ticketPoolService.addTicket(ticket);

            try {
                Thread.sleep(ticketReleaseRate * 1000L);
            } catch (InterruptedException e) {
                throw new RuntimeException(e.getMessage());
            }
        }
    }

    /**
     * Gets the shared ticket ID counter.
     *
     * @return the ticket ID counter
     */
    public static AtomicInteger getTicketIdCounter() {
        return ticketIdCounter;
    }

    /**
     * Sets the shared ticket ID counter.
     *
     * @param ticketIdCounter the new ticket ID counter
     */
    public static void setTicketIdCounter(AtomicInteger ticketIdCounter) {
        Vendor.ticketIdCounter = ticketIdCounter;
    }

}
