import React from 'react';
import '../css/App.css';
import { MainSet } from './settings/MainSet';
import { MainBlock } from './active-block/MainBlock';

function App() {
  return (
    <div className="App">
      <MainBlock />
      <MainSet />
    </div>
  );
}

export default App;
