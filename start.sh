#!/bin/bash

# Start the Spring Boot backend
echo "Starting Spring Boot backend..."
mvn spring-boot:run &

# Wait for backend to start
echo "Waiting for backend to initialize..."
sleep 10

# Start the React frontend
echo "Starting React frontend..."
cd frontend && npm start 