import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.connected = false;
    this.notesSubscription = null;
    this.onConnectCallback = null;
    this.connectionAttempts = 0;
    this.maxAttempts = 10;
  }

  connect(onNotesReceived) {
    if (this.connectionAttempts > this.maxAttempts) {
      console.error('Maximum connection attempts reached');
      return;
    }
    
    this.connectionAttempts++;
    this.onConnectCallback = onNotesReceived; // Store callback for reconnection
    
    try {
      // Simplified: just use localhost:8080 directly for testing
      const backendUrl = 'http://localhost:8080';
      console.log(`Connecting to WebSocket at: ${backendUrl}/ws (Attempt ${this.connectionAttempts})`);
      
      // Create a fresh SockJS instance
      const socket = new SockJS(`${backendUrl}/ws`);
      
      // Fix for the factory issue - use direct socket instance
      this.stompClient = Stomp.over(socket);
      
      // Configure Stomp client
      this.stompClient.heartbeat.outgoing = 20000; // 20 seconds
      this.stompClient.heartbeat.incoming = 20000;
      
      // Fix for debug is not a function error
      this.stompClient.debug = function(str) {
        console.log(str);
      };
      
      // Connect with empty headers object
      const headers = {};
      
      this.stompClient.connect(headers, 
        // Success callback
        frame => {
          console.log('Connected to WebSocket:', frame);
          this.connected = true;
          this.connectionAttempts = 0; // Reset connection attempts on success
          
          // Subscribe to notes topic
          this.notesSubscription = this.stompClient.subscribe('/topic/notes', message => {
            try {
              const noteData = JSON.parse(message.body);
              console.log('Received note:', noteData);
              onNotesReceived(noteData);
            } catch (error) {
              console.error('Error processing WebSocket message:', error);
            }
          });
        }, 
        // Error callback
        error => {
          console.error('WebSocket connection error:', error);
          this.connected = false;
          setTimeout(() => this.connect(this.onConnectCallback), 3000);
        }
      );
    } catch (error) {
      console.error('Error establishing WebSocket connection:', error);
      this.connected = false;
      setTimeout(() => this.connect(this.onConnectCallback), 3000);
    }
  }

  // For simplicity, just use localhost:8080 for testing
  getBackendUrl() {
    return 'http://localhost:8080';
  }

  disconnect() {
    if (this.stompClient && this.connected) {
      try {
        if (this.notesSubscription) {
          this.notesSubscription.unsubscribe();
        }
        this.stompClient.disconnect();
        this.connected = false;
        console.log('Disconnected from WebSocket');
      } catch (error) {
        console.error('Error disconnecting from WebSocket:', error);
      }
    }
  }

  sendNote(note) {
    if (this.stompClient && this.connected) {
      try {
        console.log('Sending note via WebSocket:', note);
        this.stompClient.send('/app/note', {}, JSON.stringify(note));
      } catch (error) {
        console.error('Error sending note via WebSocket:', error);
      }
    } else {
      console.error('Cannot send note: WebSocket not connected');
      this.connect(this.onConnectCallback);
    }
  }
}

// Singleton instance
const webSocketService = new WebSocketService();
export default webSocketService; 