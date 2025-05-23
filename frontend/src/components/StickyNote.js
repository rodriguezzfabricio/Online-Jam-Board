import React, { useState, useRef, useEffect, useCallback } from 'react';

const StickyNote = ({ 
  id, 
  initialX, 
  initialY, 
  color = '#fff9c4',
  content = '',
  onDelete,
  onContentChange,
  tool,
  brushColor,
  brushSize
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [noteContent, setNoteContent] = useState(content || 'Click to add text...');
  
  const noteRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const resizeHandleRef = useRef(null);
  
  // Update local content when prop changes (via WebSocket)
  useEffect(() => {
    if (content && content !== noteContent && contentRef.current) {
      setNoteContent(content);
      contentRef.current.innerText = content;
    }
  }, [content, noteContent]);
  
  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Clear canvas
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, [color]);
  
  // Set up drawing handlers
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    const startDrawing = (e) => {
      if ((tool !== 'pen' && tool !== 'eraser') || isTyping) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      context.beginPath();
      context.moveTo(x, y);
      
      if (tool === 'pen') {
        context.strokeStyle = brushColor;
        context.lineWidth = brushSize;
      } else if (tool === 'eraser') {
        context.strokeStyle = color; // Use sticky note background color
        context.lineWidth = brushSize * 2; // Make eraser slightly bigger
      }
      
      context.lineCap = 'round';
      context.lineJoin = 'round';
      
      setIsDrawing(true);
    };
    
    const draw = (e) => {
      if (!isDrawing || (tool !== 'pen' && tool !== 'eraser')) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      context.lineTo(x, y);
      context.stroke();
    };
    
    const stopDrawing = () => {
      if (isDrawing) {
        context.closePath();
        setIsDrawing(false);
      }
    };
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
    };
  }, [isDrawing, tool, brushColor, brushSize, isTyping, color]);
  
  // Handle dragging
  const handleMouseDown = useCallback((e) => {
    if (e.target === resizeHandleRef.current) return;
    
    if (e.target.classList.contains('note-content') || 
        e.target === canvasRef.current ||
        e.target.classList.contains('delete-btn') ||
        e.target.parentNode.classList.contains('delete-btn')) return;
    
    setIsDragging(true);
    const rect = noteRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);
  
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const boardRect = noteRef.current.parentElement.getBoundingClientRect();
    
    const newX = e.clientX - boardRect.left - dragOffset.x;
    const newY = e.clientY - boardRect.top - dragOffset.y;
    
    const maxX = boardRect.width - noteRef.current.offsetWidth;
    const maxY = boardRect.height - noteRef.current.offsetHeight;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  }, [isDragging, dragOffset]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    
    // Send position update via WebSocket
    if (onContentChange) {
      onContentChange(id, noteContent, { x: position.x, y: position.y });
    }
  }, [id, noteContent, onContentChange, position.x, position.y]);
  
  // Handle content changes
  const handleContentChange = useCallback((e) => {
    const newContent = e.target.innerText;
    setNoteContent(newContent);
  }, []);
  
  // Send content changes to parent/WebSocket when user finishes editing
  const handleContentBlur = useCallback(() => {
    setIsTyping(false);
    if (onContentChange) {
      onContentChange(id, noteContent);
    }
  }, [id, noteContent, onContentChange]);
  
  // Resize functionality
  const handleResizeStart = useCallback((e) => {
    e.stopPropagation();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    
    const handleResize = (e) => {
      const newWidth = Math.max(150, startWidth + (e.clientX - startX));
      const newHeight = Math.max(150, startHeight + (e.clientY - startY));
      
      setSize({ width: newWidth, height: newHeight });
      
      // Resize canvas
      if (canvasRef.current) {
        canvasRef.current.width = newWidth - 40; // Adjust for padding
        canvasRef.current.height = newHeight - 40;
        
        // Redraw after resize
        const context = canvasRef.current.getContext('2d');
        context.fillStyle = color;
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };
    
    const handleResizeEnd = () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
      
      // Send size update
      if (onContentChange) {
        onContentChange(id, noteContent, { width: size.width, height: size.height });
      }
    };
    
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
  }, [color, id, noteContent, onContentChange, size.height, size.width]);
  
  // Add event listeners for dragging
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
  }, [isDragging, handleMouseMove, handleMouseUp]);
  
  return (
    <div 
      ref={noteRef}
      className="sticky-note"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        backgroundColor: color
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
      
      {/* Drawing canvas (when in drawing mode) */}
      <canvas 
        ref={canvasRef}
        width={size.width - 40} // Adjust for padding
        height={size.height - 40}
        style={{ 
          display: (tool === 'pen' || tool === 'eraser') && !isTyping ? 'block' : 'none',
          position: 'absolute',
          top: '20px',
          left: '20px',
          cursor: tool === 'eraser' ? 'cell' : 'crosshair'
        }}
      />
      
      {/* Note content - editable (when in text mode) */}
      <div 
        ref={contentRef}
        className="note-content"
        contentEditable="true"
        suppressContentEditableWarning={true}
        onFocus={() => setIsTyping(true)}
        onBlur={handleContentBlur}
        onInput={handleContentChange}
        style={{ display: (tool === 'pen' || tool === 'eraser') && !isTyping ? 'none' : 'block' }}
      >
        {noteContent}
      </div>
      
      {/* Resize handle */}
      <div 
        ref={resizeHandleRef}
        className="resize-handle"
        onMouseDown={handleResizeStart}
      ></div>
    </div>
  );
};

export default StickyNote;
