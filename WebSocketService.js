import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;
const SOCKET_URL = 'http://localhost:8080/ws';
const MAX_RETRIES = 5;
let retryCount = 0;
let subscribers = new Map();

function connectWebSocket() {
    if (stompClient && stompClient.connected) {
        console.log("Already connected to WebSocket");
        return;
    }

    console.log(`Connecting to WebSocket at: ${SOCKET_URL} (Attempt ${retryCount + 1})`);
    const socket = new SockJS(SOCKET_URL);
    stompClient = Stomp.over(socket);

    // Disable debug logging
    stompClient.debug = null;

    stompClient.connect(
        {},
        onConnect,
        onError
    );
}

function onConnect() {
    console.log("Successfully connected via STOMP");
    retryCount = 0;
    
    // Resubscribe to all previous subscriptions
    subscribers.forEach((callback, topic) => {
        subscribe(topic, callback);
    });
}

function onError(error) {
    console.error("Error while connecting:", error);
    
    // Implement reconnection logic
    if (retryCount < MAX_RETRIES) {
        retryCount++;
        console.log(`Attempting to reconnect (${retryCount}/${MAX_RETRIES})...`);
        setTimeout(connectWebSocket, 5000); // Retry after 5 seconds
    } else {
        console.error("Max retry attempts reached. Please refresh the page.");
    }
}

function disconnect() {
    if (stompClient) {
        stompClient.disconnect(() => {
            console.log("Disconnected from WebSocket");
        });
    }
}

function subscribe(topic, callback) {
    if (!stompClient || !stompClient.connected) {
        console.warn("Not connected to WebSocket. Adding to pending subscriptions.");
        subscribers.set(topic, callback);
        connectWebSocket();
        return;
    }

    stompClient.subscribe(topic, (message) => {
        try {
            const payload = JSON.parse(message.body);
            callback(payload);
        } catch (error) {
            console.error("Error processing message:", error);
        }
    });

    subscribers.set(topic, callback);
}

function sendMessage(destination, message) {
    if (!stompClient || !stompClient.connected) {
        console.error("Not connected to WebSocket");
        return;
    }

    stompClient.send(destination, {}, JSON.stringify(message));
}

function isConnected() {
    return stompClient && stompClient.connected;
}

export {
    connectWebSocket,
    disconnect,
    subscribe,
    sendMessage,
    isConnected
}; 