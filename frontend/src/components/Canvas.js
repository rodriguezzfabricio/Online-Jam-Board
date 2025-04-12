import React, { useEffect, useRef, useState } from 'react'; // Add useState to imports

const Canvas = () => {
  const canvasRef = useRef(null);
  // Add state variables using useState
  const [color, setColor] = useState('#000000'); // Default color black
  const [brushWidth, setBrushWidth] = useState(5); // Default width 5
  
  useEffect(() => {
    // Get the canvas element
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Fill canvas with white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);
  
  return (
    <div className="canvas-container">
      <div className="drawing-controls">
        <div className="control">
          <label>Brush Color</label>
          <input 
            type="color" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="control">
          <label>Brush Size</label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushWidth}
            onChange={(e) => setBrushWidth(parseInt(e.target.value))}
          />
          <span>{brushWidth}px</span>
        </div>
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;