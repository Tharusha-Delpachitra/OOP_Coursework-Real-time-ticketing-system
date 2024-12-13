package com.Tharusha.TicketSystem.Controller;

import com.Tharusha.TicketSystem.Model.SystemConfig;
import com.Tharusha.TicketSystem.Service.SystemConfigService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for managing system configuration.
 */
@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/ticketSystem/config")
public class SystemConfigController {

    private final SystemConfigService systemConfigService;

    /**
     * Constructs a new SystemConfigController object.
     *
     * @param systemConfigService the system configuration service
     */
    @Autowired
    public SystemConfigController(SystemConfigService systemConfigService) {
        this.systemConfigService = systemConfigService;
    }

    /**
     * Adds or updates the system configuration.
     *
     * @param systemConfig the system configuration to add or update
     * @return the updated system configuration
     */
    @PostMapping("/update")
    @Operation
    public SystemConfig addOrUpdateConfig(
            @RequestBody SystemConfig systemConfig
    ) {
        return systemConfigService.addOrUpdateSystemConfig(systemConfig);
    }

    /**
     * Retrieves the current system configuration.
     *
     * @return the current system configuration
     */
    @GetMapping("/getConfig")
    @Operation
    public SystemConfig getConfig() {
        return systemConfigService.getSystemConfig();
    }
}
