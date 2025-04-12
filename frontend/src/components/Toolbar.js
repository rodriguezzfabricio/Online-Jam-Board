import React from 'react';

const Toolbar = ({ 
  boardId,
  color,
  setColor,
  brushWidth,
  setBrushWidth,
  tool,
  setTool,
  onAddNote,
  onColorChange,
  currentNoteColor,
  onSave,
  onLoad,
  onExport
}) => {
  // Note color options
  const noteColors = [
    { name: 'yellow', hex: '#fff9c4' },
    { name: 'blue', hex: '#bbdefb' },
    { name: 'green', hex: '#c8e6c9' },
    { name: 'pink', hex: '#f8bbd0' },
    { name: 'orange', hex: '#ffe0b2' }
  ];
  
  // Drawing color options
  const penColors = [
    { name: 'black', hex: '#000000' },
    { name: 'red', hex: '#FF0000' },
    { name: 'blue', hex: '#0000FF' },
    { name: 'green', hex: '#00FF00' },
  ];
  
  return (
    <div className="toolbar">
      <div className="tool-section">
        <h3>Board: {boardId}</h3>
      </div>
      
      <div className="tool-section">
        <h3>Drawing Tools</h3>
        <div className="tools">
          <button 
            className={`tool-btn ${tool === 'text' ? 'active' : ''}`}
            onClick={() => setTool('text')}
            title="Text Tool"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
            </svg>
          </button>
          <button 
            className={`tool-btn ${tool === 'pen' ? 'active' : ''}`}
            onClick={() => setTool('pen')}
            title="Pen Tool"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87L20.71,7.04Z M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
            </svg>
          </button>
          <button 
            className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
            onClick={() => setTool('eraser')}
            title="Eraser Tool"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="tool-section">
        <h3>Pen Color</h3>
        <div className="color-options">
          {penColors.map(penColor => (
            <button 
              key={penColor.name}
              className={`color-btn ${color === penColor.hex ? 'active' : ''}`}
              style={{ backgroundColor: penColor.hex }}
              onClick={() => setColor(penColor.hex)}
              title={`${penColor.name.charAt(0).toUpperCase() + penColor.name.slice(1)} pen`}
            />
          ))}
        </div>
      </div>

      <div className="tool-section">
        <h3>Pen Size</h3>
        <div className="brush-size">
          <input
            type="range"
            min="1"
            max="20"
            value={brushWidth}
            onChange={(e) => setBrushWidth(parseInt(e.target.value))}
          />
          <span className="brush-size-label">{brushWidth}px</span>
        </div>
      </div>
      
      <div className="tool-section">
        <h3>Note Color</h3>
        <div className="note-colors">
          {noteColors.map(noteColor => (
            <button 
              key={noteColor.name}
              className={`note-color-btn ${currentNoteColor === noteColor.hex ? 'active' : ''}`}
              style={{ backgroundColor: noteColor.hex }}
              onClick={() => onColorChange(noteColor.name)}
              title={`${noteColor.name.charAt(0).toUpperCase() + noteColor.name.slice(1)} note`}
            />
          ))}
        </div>
      </div>
      
      <button 
        className="add-btn" 
        onClick={onAddNote}
      >
        Add Sticky Note
      </button>
      
      <div className="tool-section board-actions">
        <h3>Board Actions</h3>
        <div className="action-buttons">
          <button 
            className="action-btn save-btn" 
            onClick={onSave}
            title="Save Board"
          >
            Save Board
          </button>
          <button 
            className="action-btn load-btn" 
            onClick={onLoad}
            title="Load Board"
          >
            Load Board
          </button>
          <button 
            className="action-btn export-btn" 
            onClick={onExport}
            title="Export as Image"
          >
            Download as Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;