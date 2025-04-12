import React, { useState, useRef, useEffect } from 'react';
import Toolbar from './Toolbar';
import StickyNote from './StickyNote';

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
  
  // Load saved notes on initial render
  useEffect(() => {
    loadBoard();
  }, []);
  
  // Add a new sticky note
  const handleAddNote = () => {
    const board = boardRef.current;
    const boardRect = board.getBoundingClientRect();
    
    const newNote = {
      id: Date.now(),
      x: (boardRect.width / 2) - 100,
      y: (boardRect.height / 2) - 100,
      color: currentNoteColor
    };
    
    setNotes([...notes, newNote]);
  };
  
  // Remove a note
  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };
  
  // Change note color
  const handleNoteColorChange = (color) => {
    setCurrentNoteColor(COLORS[color] || COLORS.yellow);
  };
  
  // Save board to local storage
  const saveBoard = () => {
    localStorage.setItem('jamBoard', JSON.stringify({
      boardId,
      notes
    }));
    alert('Board saved successfully!');
  };
  
  // Load board from local storage
  const loadBoard = () => {
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
            onDelete={handleDeleteNote}
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