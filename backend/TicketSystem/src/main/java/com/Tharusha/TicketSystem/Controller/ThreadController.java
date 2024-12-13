package com.Tharusha.TicketSystem.Controller;

import com.Tharusha.TicketSystem.DTO.AnalyticDataDTO;
import com.Tharusha.TicketSystem.Model.Customer;
import com.Tharusha.TicketSystem.Model.SystemConfig;
import com.Tharusha.TicketSystem.Model.Ticket;
import com.Tharusha.TicketSystem.Model.Vendor;
import com.Tharusha.TicketSystem.Service.SystemConfigService;
import com.Tharusha.TicketSystem.Service.TicketPoolService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static com.Tharusha.TicketSystem.Model.Vendor.*;

/**
 * Controller class for managing the ticket simulation.
 */
@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/tickets")
public class ThreadController {

    private TicketPoolService ticketPoolService;
    private SystemConfigService systemConfigService;

    private List<Thread> vendorThreads = new ArrayList<>();
    private List<Thread> customerThreads = new ArrayList<>();

    private static boolean isRunning = false;

    /**
     * Constructs a new ThreadController object.
     *
     * @param ticketPoolService   the ticket pool service
     * @param systemConfigService the system configuration service
     */
    @Autowired
    public ThreadController(TicketPoolService ticketPoolService, SystemConfigService systemConfigService) {
        this.ticketPoolService = ticketPoolService;
        this.systemConfigService = systemConfigService;
    }

    /**
     * Starts the simulation by creating and starting vendor and customer threads.
     *
     * @return a ResponseEntity indicating success or failure
     */
    @PostMapping("/start")
    @Operation
    public ResponseEntity<String> startThreads() {
        // Fetch system configuration
        SystemConfig systemConfig = systemConfigService.getSystemConfig();

        if (systemConfig == null) {
            return ResponseEntity.badRequest().body("System configuration not found. Please configure the system first.");
        }

        if (isRunning) {
            return ResponseEntity.badRequest().body("Threads are already running.");
        }

        isRunning = true;

        // Extract values from the configuration
        int totalTickets = systemConfig.getTotalTickets();
        int ticketReleaseRate = systemConfig.getTicketReleaseRate();
        int customerRetrievalRate = systemConfig.getCustomerRetrievalRate();
        int noOfVendors = systemConfig.getNoOfVendors();
        int noOfCustomers = systemConfig.getNoOfCustomers();
        int quantity  = systemConfig.getQuantity();

        // Clear previous thread references if there is any
        vendorThreads.clear();
        customerThreads.clear();

        // Start vendor threads if not already started
        if (vendorThreads.isEmpty()) {
            for (int i = 1; i <= noOfVendors; i++) {
                Thread vendorThread = new Thread(new Vendor(ticketPoolService, totalTickets, ticketReleaseRate, this));
                vendorThread.setName("Vendor-" + i);
                vendorThread.start();
                vendorThreads.add(vendorThread);
            }
        }

        // Start customer threads if not already started
        if (customerThreads.isEmpty()) {
            for (int i = 1; i <= noOfCustomers; i++) {
                Thread customerThread = new Thread(new Customer(ticketPoolService, customerRetrievalRate, quantity));
                customerThread.setName("Customer-" + i);
                customerThread.start();
                customerThreads.add(customerThread);
            }
        }

        return ResponseEntity.ok("Vendor and Customer threads started with configuration values.");
    }

    /**
     * Stops the running simulation by interrupting the vendor and customer threads.
     *
     * @return a ResponseEntity indicating success or failure
     */
    @Operation
    @PostMapping("/stop")
    public ResponseEntity<String> stopThreads() {

        if (!isRunning) {
            return ResponseEntity.badRequest().body("Threads are not running.");
        }

        // Signal threads to stop
        isRunning = false;

        return ResponseEntity.ok("Threads stopped.");
    }

    public boolean isRunning() {
        return isRunning;
    }

    /**
     * Resets the simulation by stopping threads and clearing data.
     *
     * @return a message indicating successful reset
     */
    @PostMapping("/reset")
    @Operation
    public String resetThreads() {

        stopThreads();

        ticketPoolService.resetLogs();

        ticketPoolService.resetTicketPool();

        ticketPoolService.resetTickets();

        vendorThreads.clear();

        customerThreads.clear();

        Vendor.setTicketIdCounter(new AtomicInteger(0));

        return "Simulation has been reset. Threads stopped and cleared";
    }

    /**
     * Retrieves the logs of the ticketing simulation.
     *
     * @return a ResponseEntity containing the logs
     */
    @GetMapping("/logs")
    @Operation
    public ResponseEntity<List<String>> getLogs() {
        return ResponseEntity.ok(ticketPoolService.getLogs());
    }

    /**
     * Retrieves the remaining tickets in the pool.
     *
     * @return a ResponseEntity containing the remaining tickets
     */
    @GetMapping("/tickets")
    @Operation
    public ResponseEntity<List<Ticket>> getRemainingTickets() {
        return ResponseEntity.ok(ticketPoolService.getAllTickets());
    }

    /**
     * Retrieves analytics data about the simulation, including total tickets, vendors, and customers.
     *
     * @return a ResponseEntity containing the analytics data
     */
    @GetMapping("/analytics")
    @Operation
    public ResponseEntity<?> analytics() {
        SystemConfig systemConfig = systemConfigService.getSystemConfig();
        if (systemConfig == null) {
            return ResponseEntity.badRequest().body("System configuration not found.");
        }

        int noOfVendors = vendorThreads.size();
        int noOfCustomers = customerThreads.size();

        // Constructing the response data
        AnalyticDataDTO analyticsData = new AnalyticDataDTO();
        analyticsData.setTotalTickets(getTicketIdCounter());
        analyticsData.setNoOfVendors(noOfVendors);
        analyticsData.setNoOfCustomers(noOfCustomers);

        return ResponseEntity.ok(analyticsData);
    }

}