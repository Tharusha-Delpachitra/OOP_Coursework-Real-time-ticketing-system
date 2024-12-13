package com.Tharusha.TicketSystem.Repository;

import com.Tharusha.TicketSystem.Model.SystemConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for interacting with the `SystemConfig` entity in the database.
 * This interface extends `JpaRepository` which provides basic CRUD operations for JPA entities.
 */
@Repository
public interface SystemConfigRepository extends JpaRepository<SystemConfig, Integer> {
}

