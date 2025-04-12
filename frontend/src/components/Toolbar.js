import React from 'react';

const Toolbar = ({ boardId, color, setColor, brushWidth, setBrushWidth, tool, setTool, onAddNote }) => {
    return (
        <div className="toolbar">
            <div className="tool-section">
                <h3>Board: {boardId}</h3>
            </div>
            
            <div className="tool-section">
                <h3>Drawing Tools</h3>
                <div className="tools">
                    <button 
                        className={`tool-btn ${tool === 'pen' ? 'active' : ''}`}
                        onClick={() => setTool('pen')}
                        title="Pen Tool"
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87L20.71,7.04Z M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                        </svg>
                    </button>
                    <button 
                        className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
                        onClick={() => setTool('eraser')}
                        title="Eraser Tool"
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z"/>
                        </svg>
                    </button>
                    <button 
                        className={`tool-btn ${tool === 'note' ? 'active' : ''}`}
                        onClick={() => setTool('note')}
                        title="Add Sticky Note"
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M14,10V4.5L19.5,10M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V9L15,3H5Z"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div className="tool-section">
                <h3>Color</h3>
                <button 
                    className="color-btn"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                        // For simplicity, just toggle between a few colors
                        const colors = ['#000000', '#FF0000', '#0000FF', '#00FF00', '#FFFF00'];
                        const currentIndex = colors.indexOf(color);
                        const nextIndex = (currentIndex + 1) % colors.length;
                        setColor(colors[nextIndex]);
                    }}
                />
            </div>

            <div className="tool-section">
                <h3>Brush Size</h3>
                <div className="brush-size">
                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={brushWidth}
                        onChange={(e) => setBrushWidth(parseInt(e.target.value))}
                    />
                </div>
            </div>
            
            <button 
                className="add-btn" 
                onClick={onAddNote}
            >
                Add Sticky Note
            </button>
        </div>
    );
};

export default Toolbar;