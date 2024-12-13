package com.Tharusha.TicketSystem.Service;

import com.Tharusha.TicketSystem.Model.SystemConfig;
import com.Tharusha.TicketSystem.Model.Ticket;
import com.Tharusha.TicketSystem.Repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;


@Service
public class TicketPoolService {

    private ConcurrentLinkedQueue<Ticket> ticketQueue;
    private final SystemConfigService systemConfigService;
    private int maximumCapacity;

    private List<String> logs = new ArrayList<>();

    @Autowired
    private TicketRepository ticketRepository;

    /**
     * Constructs a new `TicketPoolService` object.
     * @param systemConfigService systemConfigService the system configuration service, used to access system settings like maximum ticket capacity
     */
    @Autowired
    public TicketPoolService(SystemConfigService systemConfigService) {
        this.systemConfigService = systemConfigService;
        this.ticketQueue = new ConcurrentLinkedQueue<>();
    }

    /**
     * Method to Adds a ticket to the ticket pool with synchronization.
     *
     * @param ticket the ticket to be added
     */
    public synchronized void addTicket(Ticket ticket) {
        SystemConfig config = systemConfigService.getSystemConfig();
        
        // Access the maximum capacity and ticket release rate
        this.maximumCapacity = config != null ? config.getMaximumTicketCapacity() : maximumCapacity;
        
        if (config != null) {
            int maximumCapacity = config.getMaximumTicketCapacity();
            while (ticketQueue.size() >= maximumCapacity) {
                try {
                    wait();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e.getMessage());
                }
            }
            ticketQueue.add(ticket);
            ticketRepository.save(ticket);
            logs.add("Ticket added by " + Thread.currentThread().getName() + " : " + ticket);  // Log the addition
            System.out.println("Ticket added by " + Thread.currentThread().getName() + " : "  +  ticket +  "Available ticket in the pool : " + ticketQueue.size());
            notifyAll();
        }
    }

    /**
     * Method to buy a ticket from the pool with synchronization.
     *
     * @return the purchased ticket or null if the pool is empty and interrupted
     */
    public synchronized Ticket buyTicket() {

        while (ticketQueue.isEmpty()) {
            try {
                wait();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException(e.getMessage());
            }
        }
        Ticket ticket = ticketQueue.poll();

        logs.add(Thread.currentThread().getName() + " bought ticket: " + ticket.toString());  // Log the ticket purchase
        System.out.println(Thread.currentThread().getName() + " bought ticket: " + ticket + "Available ticket in the pool : " +  ticketQueue.size());
        notifyAll();
        return ticket;
    }

    /**
     * Resets the internal log list.
     */
    public void resetLogs() {
        this.logs.clear();
    }

    /**
     * Resets the ticket pool by clearing the queue.
     */
    public void resetTicketPool() {
        this.ticketQueue.clear();

    }

    /**
     * Retrieves a copy of all tickets in the pool (avoids modifying the original queue).
     *
     * @return a list of tickets in the pool
     */
    public synchronized List<Ticket> getAllTickets() {
        return new LinkedList<>(ticketQueue);
    }

    /**
     * Retrieves the internal log list.
     *
     * @return a list of log messages
     */
    public List<String> getLogs() {
        return logs;
    }

    /**
     * Deletes all tickets from the database.
     */
    public void resetTickets() {
        ticketRepository.deleteAll();
    }

}
