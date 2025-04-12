// frontend/src/components/Board.js
import React, { useEffect, useState } from 'react';
import Canvas from './Canvas';
import WebSocketService from '../services/WebSocketService';

const Board = ({ boardId }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [webSocketService, setWebSocketService] = useState(null);

  useEffect(() => {
    // ... existing WebSocket logic ...
  }, [boardId]);

  return (
    <div className="board-container">
      <h2 className="board-title">
        Collaborative Board: {boardId}
      </h2>
      {!isConnected && (
        <div className="connection-status">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12" y2="8"/>
          </svg>
          Connecting to server...
        </div>
      )}
      <Canvas 
        boardId={boardId} 
        webSocketService={webSocketService}
        onDrawing={handleDrawing}
      />
    </div>
  );
};

export default Board;