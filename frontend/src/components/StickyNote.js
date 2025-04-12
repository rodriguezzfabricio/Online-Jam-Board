import React, { useState, useRef, useEffect } from 'react';

const StickyNote = ({ id, initialX, initialY, onDelete }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const noteRef = useRef(null);
  
  // Handle dragging
  const handleMouseDown = (e) => {
    if (e.target.classList.contains('note-content') || 
        e.target.classList.contains('delete-btn') ||
        e.target.parentNode.classList.contains('delete-btn')) return;
    
    setIsDragging(true);
    const rect = noteRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    // Get parent board dimensions
    const boardRect = noteRef.current.parentElement.getBoundingClientRect();
    
    // Calculate new position within board boundaries
    const newX = e.clientX - boardRect.left - dragOffset.x;
    const newY = e.clientY - boardRect.top - dragOffset.y;
    
    // Apply boundaries
    const maxX = boardRect.width - noteRef.current.offsetWidth;
    const maxY = boardRect.height - noteRef.current.offsetHeight;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Add event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  return (
    <div 
      ref={noteRef}
      className="sticky-note"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px` 
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Delete button */}
      <button 
        className="delete-btn" 
        onClick={() => onDelete(id)}
        title="Delete note"
      >
        &times;
      </button>
      
      {/* Decorative pin */}
      <div className="pin">
        <div className="pin-head">
          <div className="pin-point"></div>
        </div>
        <div className="pin-body"></div>
      </div>
      
      {/* Note content - editable */}
      <div 
        className="note-content"
        contentEditable="true"
        suppressContentEditableWarning={true}
      >
        Click to add text or draw here...
      </div>
    </div>
  );
};

export default StickyNote;
