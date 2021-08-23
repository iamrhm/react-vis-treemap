import React from 'react';
import './App.css';

import Graph from './components/graph'
import Playground from './components/playground';

const App = () => {
  return (
    <div className="container">
      <div className="graph-container">
        <div className="dummy-padding"/>
        <Graph />
        <div className="dummy-padding"/>
      </div>
      <div className="playground-container">
        <Playground />
      </div>
    </div>
  )
}

export default App;
