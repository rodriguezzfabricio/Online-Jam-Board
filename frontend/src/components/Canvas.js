import React, { useState, useRef, useEffect, useCallback } from 'react';
import Toolbar from './Toolbar';
import StickyNote from './StickyNote';
import webSocketService from '../services/WebSocketService';

const COLORS = {
  yellow: '#fff9c4',
  blue: '#bbdefb',
  green: '#c8e6c9',
  pink: '#f8bbd0',
  orange: '#ffe0b2'
};

const Canvas = ({ boardId }) => {
  const [color, setColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(3);
  const [tool, setTool] = useState('text'); // 'text', 'pen', 'eraser'
  const [notes, setNotes] = useState([]);
  const [currentNoteColor, setCurrentNoteColor] = useState(COLORS.yellow);
  const boardRef = useRef(null);
  
  // Handle WebSocket messages
  const handleWebSocketMessage = useCallback((data) => {
    if (data.type === 'DELETE') {
      // Handle note deletion
      setNotes(prevNotes => prevNotes.filter(note => note.id !== data.id));
    } else {
      // Handle note creation/update
      setNotes(prevNotes => {
        const noteIndex = prevNotes.findIndex(note => note.id === data.id);
        if (noteIndex >= 0) {
          // Update existing note
          const updatedNotes = [...prevNotes];
          updatedNotes[noteIndex] = data;
          return updatedNotes;
        } else {
          // Add new note
          return [...prevNotes, data];
        }
      });
    }
  }, []);
  
  // Get backend URL using the same method as WebSocketService
  const getBackendUrl = useCallback(() => {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8080';
    } else {
      return `http://${hostname}:8080`;
    }
  }, []);
  
  // Load board from local storage - moved up to solve reference issue
  const loadBoard = useCallback(() => {
    try {
      const savedBoard = localStorage.getItem('jamBoard');
      if (savedBoard) {
        const { notes: savedNotes } = JSON.parse(savedBoard);
        if (savedNotes && Array.isArray(savedNotes)) {
          setNotes(savedNotes);
          return true;
        }
      }
      return false;
    } catch (err) {
      console.error('Error loading board:', err);
      return false;
    }
  }, []);
  
  // Connect to WebSocket and load notes
  useEffect(() => {
    // Connect to WebSocket
    webSocketService.connect(handleWebSocketMessage);
    
    // Fetch notes from API
    const fetchNotes = async () => {
      try {
        // Use direct URL for testing
        const backendUrl = 'http://localhost:8080';
        console.log(`Fetching notes from: ${backendUrl}/api/notes/board/${boardId}`);
        
        // Create default UUID if not provided
        const useBoardId = boardId || 'default-board';
        
        // Convert string to UUID if it's not already a UUID
        let boardIdParam = useBoardId;
        if (useBoardId === 'default-board') {
          // For default-board, use a hardcoded UUID that matches what's in the database
          boardIdParam = '00000000-0000-0000-0000-000000000000';
        }
        
        const response = await fetch(`${backendUrl}/api/notes/board/${boardIdParam}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3000'
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched notes successfully:', data);
          setNotes(data);
        } else {
          console.error('API returned error status:', response.status);
          // Fall back to local storage
          const loaded = loadBoard();
          console.log('Loaded from local storage:', loaded);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
        // Fall back to local storage
        const loaded = loadBoard();
        console.log('Loaded from local storage:', loaded);
      }
    };
    
    fetchNotes();
    
    // Clean up WebSocket connection on unmount
    return () => {
      webSocketService.disconnect();
    };
  }, [boardId, handleWebSocketMessage, loadBoard]);
  
  // Add a new sticky note
  const handleAddNote = () => {
    const board = boardRef.current;
    const boardRect = board.getBoundingClientRect();
    
    const newNote = {
      id: Date.now(),
      boardId: boardId,
      x: (boardRect.width / 2) - 100,
      y: (boardRect.height / 2) - 100,
      color: currentNoteColor,
      content: ''
    };
    
    // Send via WebSocket
    webSocketService.sendNote(newNote);
    
    // Optimistically update UI
    setNotes([...notes, newNote]);
  };
  
  // Remove a note
  const handleDeleteNote = useCallback((id) => {
    // Send delete request via WebSocket
    if (webSocketService.stompClient && webSocketService.connected) {
      webSocketService.stompClient.send('/app/note/delete', {}, JSON.stringify({ id }));
    } else {
      console.error('Cannot delete note: WebSocket not connected');
    }
    
    // Optimistically update UI
    setNotes(notes => notes.filter(note => note.id !== id));
  }, []);
  
  // Change note color
  const handleNoteColorChange = (color) => {
    setCurrentNoteColor(COLORS[color] || COLORS.yellow);
  };
  
  // Save board to local storage (backup)
  const saveBoard = () => {
    localStorage.setItem('jamBoard', JSON.stringify({
      boardId,
      notes
    }));
    alert('Board saved successfully!');
  };
  
  // Export board as image
  const exportAsImage = () => {
    import('html2canvas').then(({ default: html2canvas }) => {
      html2canvas(boardRef.current).then(canvas => {
        const link = document.createElement('a');
        link.download = 'jam-board.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }).catch(err => {
      console.error('Error loading html2canvas:', err);
      alert('Failed to export image. Please try again.');
    });
  };
  
  // Update note content
  const handleNoteContentChange = useCallback((id, content) => {
    const updatedNote = notes.find(note => note.id === id);
    if (updatedNote) {
      updatedNote.content = content;
      webSocketService.sendNote(updatedNote);
    }
  }, [notes]);
  
  return (
    <>
      <Toolbar 
        boardId={boardId}
        color={color}
        setColor={setColor}
        brushWidth={brushWidth}
        setBrushWidth={setBrushWidth}
        tool={tool}
        setTool={setTool}
        onAddNote={handleAddNote}
        onColorChange={handleNoteColorChange}
        currentNoteColor={currentNoteColor}
        onSave={saveBoard}
        onLoad={loadBoard}
        onExport={exportAsImage}
      />
      
      <div className="cork-board" ref={boardRef}>
        {notes.map(note => (
          <StickyNote 
            key={note.id}
            id={note.id}
            initialX={note.x}
            initialY={note.y}
            color={note.color}
            content={note.content}
            onDelete={handleDeleteNote}
            onContentChange={handleNoteContentChange}
            tool={tool}
            brushColor={color}
            brushSize={brushWidth}
          />
        ))}
        
        {/* Floating add note button */}
        <button className="add-note-btn" onClick={handleAddNote} title="Add Sticky Note">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="#000" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Canvas;