import React from 'react';
import Canvas from './Canvas';

const Board = ({ boardId }) => {
  return (
    <div className="board-container">
      <h2>Board: {boardId}</h2>
      <Canvas />
    </div>
  );
};

export default Board;