import React, { useEffect } from 'react';
import { connectWebSocket, subscribe, sendMessage } from './WebSocketService';

function App() {
    useEffect(() => {
        // Connect to WebSocket when component mounts
        connectWebSocket();

        // Subscribe to topics
        subscribe('/topic/updates', (message) => {
            console.log('Received:', message);
        });

        // Example of sending a message
        sendMessage('/app/send', { text: 'Hello!' });

        // Cleanup on unmount
        return () => {
            disconnect();
        };
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="App">
            {/* Your app content */}
        </div>
    );
}

export default App; 