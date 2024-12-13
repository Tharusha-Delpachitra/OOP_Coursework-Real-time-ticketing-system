package com.Tharusha.TicketSystem.Service;

import com.Tharusha.TicketSystem.Model.SystemConfig;
import com.Tharusha.TicketSystem.Repository.SystemConfigRepository;
import org.springframework.stereotype.Service;

/**
 * Service class for managing system configuration in the ticketing system.
 * This class interacts with the `SystemConfigRepository` to retrieve and update system configuration.
 */
@Service
public class SystemConfigService {

    private final SystemConfigRepository systemConfigRepository;

    /**
     * Constructor to inject the `SystemConfigRepository` dependency.
     *
     * @param systemConfigRepository repository for interacting with the `SystemConfig` entity
     */
    public SystemConfigService(SystemConfigRepository systemConfigRepository) {
        this.systemConfigRepository = systemConfigRepository;
    }


    /**
     * Adds a new system configuration or updates an existing one.
     *
     * @param systemConfig the system configuration details to save
     * @return the saved system configuration
     */
    public SystemConfig addOrUpdateSystemConfig(SystemConfig systemConfig) {
        SystemConfig existingConfig = systemConfigRepository.findById(1).orElse(null);;

        if (existingConfig != null) {
            // If configuration exists, update its properties
            existingConfig.setTotalTickets(systemConfig.getTotalTickets());
            existingConfig.setTicketReleaseRate(systemConfig.getTicketReleaseRate());
            existingConfig.setCustomerRetrievalRate(systemConfig.getCustomerRetrievalRate());
            existingConfig.setMaximumTicketCapacity(systemConfig.getMaximumTicketCapacity());
            existingConfig.setNoOfVendors(systemConfig.getNoOfVendors());
            existingConfig.setNoOfCustomers(systemConfig.getNoOfCustomers());
            existingConfig.setQuantity(systemConfig.getQuantity());

            return systemConfigRepository.save(existingConfig);

        } else {
            // If configuration doesn't exist, set ID to 1 and save
            systemConfig.setId(1);
            return systemConfigRepository.save(systemConfig);
        }
    }

    /**
     * Retrieves the current system configuration.
     *
     * @return the system configuration object
     */
    public SystemConfig getSystemConfig() {
        return systemConfigRepository.findById(1).orElse(null);
    }
}