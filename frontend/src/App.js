import React, { useState } from 'react';
import Board from './components/Board';

const App = () => {
  // For MVP, we'll use a hardcoded board ID
  // In a real application, you would get this from routing or user selection
  const [boardId] = useState('default-board');

  return (
    <div className="app">
      <header>
        <h1>Online Jam Board</h1>
      </header>
      <main>
        <Board boardId={boardId} />
      </main>
    </div>
  );
};

export default App; 