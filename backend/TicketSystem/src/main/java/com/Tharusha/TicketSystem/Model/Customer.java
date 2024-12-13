package com.Tharusha.TicketSystem.Model;

import com.Tharusha.TicketSystem.Service.TicketPoolService;

public class Customer implements Runnable {

    private TicketPoolService ticketPoolService;
    private  int customerRetrievalRate;
    private int quantity;

    /**
     * Constructs a new Customer object.
     *
     * @param ticketPoolService   the ticket pool service
     * @param customerRetrievalRate the rate at which the customer buys tickets
     * @param quantity             the number of tickets to buy
     */
    public Customer(TicketPoolService ticketPoolService, int customerRetrievalRate, int quantity) {
        this.ticketPoolService = ticketPoolService;
        this.customerRetrievalRate = customerRetrievalRate;
        this.quantity = quantity;
    }

    /**
     * The main execution method of the customer thread.
     * It repeatedly buys tickets from the pool at the specified customerRetrievalRate according to the for loop validation.
     */
    @Override
    public void run() {
        for (int i = 0; i < quantity; i++) { // Keep buying tickets
            Ticket ticket = ticketPoolService.buyTicket();

            try {
                Thread.sleep(customerRetrievalRate * 1000L); // Wait before buying the next ticket
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println(Thread.currentThread().getName() + " interrupted.");
                break; // Exit the loop if interrupted
            }
        }
    }

}
