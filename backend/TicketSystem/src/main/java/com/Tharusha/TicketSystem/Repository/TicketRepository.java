package com.Tharusha.TicketSystem.Repository;

import com.Tharusha.TicketSystem.Model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for interacting with the `Ticket` entity in the database.
 * This interface extends `JpaRepository` which provides basic CRUD operations for JPA entities.
 */
@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

}
