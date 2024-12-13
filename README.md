
# Real-Time Ticketing System with Advanced Producer-Consumer Implementation

A web application for configuring, simulating, and managing ticket distribution in a multi-threaded environment. Built with React and Tailwind CSS for the frontend, Spring Boot for the backend, and MySQL for database management.


## Configuration Page

- Form for user input:

    - Total tickets

    - Ticket release rate

    - Customer retrieval rate

    - Maximum ticket capacity

    - Number of vendors

    - Number of customers

    - Quantity of tickets a customer can buy

- Option to proceed with previous configuration details.

## Logs & Analytics Page

- Displays:

    - Ticket logs (simulation details such as vendors adding tickets or customers buying     tickets with relevant details).

    - Remaining tickets in the pool.

## Control Panel

- Start: Starts the ticket simulation and displays real-time data.

- Stop: Stops the simulation.

- Reset: Resets the simulation threads, logs, and configuration details.

- Configure System: Redirects back to the configuration page.

## Visualization

- Pie Chart: Displays the ratio of vendors, customers, and tickets.

- Logs Table: Shows detailed logs of ticket operations.

- Remaining Tickets Component: Displays the count and details of tickets remaining in the pool.

## Tech Stack

**Client:** React, Tailwind CSS

**Server:** Spring Boot, MySQL


## Installation

Prerequisites

- Node.js (v20.17.0) and npm installed

- Java Development Kit (JDK) installed (v17 or above)

- MySQL installed

Steps to setup

### Frontend

- Navigate to the frontend directory:
 ```bash
  cd frontend
 ```
- Install dependencies:
```bash
  npm install
 ```
- Start the development server:
```bash
  npm run dev
 ```

### Backend

- Import the project into an IDE like IntelliJ IDEA.
- Configure the application properties for MySQL connection in
  - application.propertise :
  ```bash
  spring.application.name=TicketSystem

  spring.datasource.url=jdbc:mysql://localhost:3306/TicketingSystem? createDatabaseIfNotExist=true
  spring.datasource.username=root
  spring.datasource.password=

  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

  spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
  spring.jpa.hibernate.ddl-auto=update
   ```

### Datebase
- The data base table is added to auto create if the database do not exist.
- Make sure to start the MySQL server and also add  the correct username and password if the values are not default.

###  API Documentation
 ```bash
 http://localhost:8080/swagger-ui.html
   ```
- The API documentation for the API can be accssed throught this link, make sure the server is running before navigating to the link

### Usage
- Open the application in a browser.

- Start by configuring the system using the form on the first page.

- Navigate to the analytics page to monitor logs and ticket details.

- Use the control panel to start, stop, reset, or reconfigure the system.