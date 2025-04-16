import React from 'react';
import './App.css';
import OpenRTBDisplay from './components/OpenRTBDisplay';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>OpenRTB Client Demo</h1>
      </header>
      <main>
        <OpenRTBDisplay />
      </main>
      <footer>
        <p>OpenRTB Client Example</p>
      </footer>
    </div>
  );
}

export default App; 