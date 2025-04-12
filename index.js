import { connectWebSocket, subscribe, sendMessage } from './WebSocketService';

// Initialize WebSocket connection when the app starts
document.addEventListener('DOMContentLoaded', () => {
    connectWebSocket();

    // Subscribe to topics
    subscribe('/topic/updates', (message) => {
        console.log('Received:', message);
    });

    // Example of sending a message
    sendMessage('/app/send', { text: 'Hello!' });
}); 