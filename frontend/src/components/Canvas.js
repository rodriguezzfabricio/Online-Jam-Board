import React, { useState, useRef } from 'react';
import Toolbar from './Toolbar';
import StickyNote from './StickyNote';

const Canvas = ({ boardId }) => {
  const [color, setColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(5);
  const [tool, setTool] = useState('pen');
  const [notes, setNotes] = useState([]);
  const boardRef = useRef(null);
  
  // Add a new sticky note
  const handleAddNote = () => {
    // Get board dimensions
    const board = boardRef.current;
    const boardRect = board.getBoundingClientRect();
    
    // Create a note in the center of the board
    const newNote = {
      id: Date.now(), // Use timestamp as a simple ID
      x: (boardRect.width / 2) - 100, // Center the note (width is 200px)
      y: (boardRect.height / 2) - 100, // Center the note (height is 200px)
    };
    
    setNotes([...notes, newNote]);
  };
  
  // Remove a note
  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };
  
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
      />
      
      <div className="cork-board" ref={boardRef}>
        {/* Render all sticky notes */}
        {notes.map(note => (
          <StickyNote 
            key={note.id}
            id={note.id}
            initialX={note.x}
            initialY={note.y}
            onDelete={() => handleDeleteNote(note.id)}
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