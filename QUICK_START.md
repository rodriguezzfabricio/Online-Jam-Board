# Online Jam Board - Quick Start Guide

This guide will help you quickly set up and run the Online Jam Board application.

## Prerequisites

- Java 17+
- Maven
- Node.js 14+
- npm or yarn
- PostgreSQL database (or Supabase)

## Backend Setup

1. Configure your database connection in `src/main/resources/application.properties`.
   Set the following environment variables or update the values directly:
   ```
   SUPABASE_HOST=your-database-host
   SUPABASE_PORT=5432
   SUPABASE_DB=your-database-name
   SUPABASE_USER=your-username
   SUPABASE_PASSWORD=your-password
   ```

2. Start the Spring Boot backend:
   ```
   mvn spring-boot:run
   ```

## Frontend Setup

1. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

2. Start the React frontend:
   ```
   npm start
   ```

3. The application will be available at `http://localhost:3000`

## Quick Start (Both Backend and Frontend)

To start both the backend and frontend with one command, use the provided script:

```
./start.sh
```

## Testing the Real-Time Functionality

1. Open the application in two different browser windows
2. Draw on the canvas in one window
3. Observe the drawing appear in real-time in the other window

## Project Structure

- `/src` - Java Spring Boot backend
- `/frontend` - React frontend application

## Adding Features

To extend the application, focus on:

1. Adding authentication and user management
2. Implementing multiple board support
3. Adding different tools (shapes, text, etc.)
4. Implementing sticky notes functionality
5. Adding persistence and undo/redo features 