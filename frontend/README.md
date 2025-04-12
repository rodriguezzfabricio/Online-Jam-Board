# Online Jam Board Frontend

This is the frontend part of the Online Jam Board application. It's built using React and provides a user interface for collaborative drawing and note-taking.

## Technologies Used

- **React**: Frontend library
- **SockJS & StompJS**: WebSocket client libraries
- **Fabric.js**: Canvas manipulation library
- **Axios**: HTTP client

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Application pages/views
└── services/       # API and WebSocket services
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Setup Instructions

1. **Install dependencies**
   ```
   npm install
   # or
   yarn install
   ```

2. **Start the development server**
   ```
   npm start
   # or
   yarn start
   ```

3. **Build for production**
   ```
   npm run build
   # or
   yarn build
   ```

## Component Overview

The application will include the following key components (to be implemented):

### BoardList
- Displays a list of available boards
- Allows creating new boards

### Board
- Main component containing the drawing canvas and notes
- Manages real-time synchronization

### Canvas
- Drawing area using Fabric.js
- Handles drawing events and tools

### NoteList / Note
- Displays and manages sticky notes
- Provides features for creating, editing, and moving notes

### WebSocketService
- Manages WebSocket connections
- Handles real-time updates

## Planned Features

- User-friendly drawing tools (pen, brush, eraser)
- Sticky notes with drag-and-drop functionality
- Real-time collaboration
- Board management (create, join, save)
- User presence indicators
- Color customization for drawings and notes
- Responsive design for various device sizes 