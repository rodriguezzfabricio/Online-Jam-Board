# Frontend Getting Started Guide

This guide will help you set up and run the frontend part of the Online Jam Board application.

## Prerequisites

- Node.js 14 or higher
- npm or yarn
- Running backend server (Spring Boot)

## Installation

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or with yarn:
   ```
   yarn install
   ```

## Running the Application

There are two ways to start the application:

### Option 1: Start frontend only (if backend is already running)

```
cd frontend
npm start
```

This will start the development server on http://localhost:3000.

### Option 2: Start both backend and frontend

From the project root directory:

```
./start.sh
```

This script starts both the Spring Boot backend and React frontend.

## Using the Application

1. Once the application starts, you'll see the Online Jam Board interface
2. You can immediately start drawing on the canvas
3. If multiple users connect to the same board, they'll see each other's drawings in real-time
4. Use the color picker and width slider to customize your drawing

## WebSocket Communication

The frontend connects to the backend via WebSocket for real-time updates:

- Connection endpoint: `/ws`
- Drawing events are sent to: `/app/board/{boardId}/drawing`
- Updates are received from: `/topic/board/{boardId}/drawings`

## Development Notes

- The application uses Fabric.js for canvas manipulation
- SockJS and STOMP.js for WebSocket communication
- The proxy in package.json redirects requests to the backend during development 