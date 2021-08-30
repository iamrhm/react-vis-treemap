import React from 'react';
import './App.css';

import Graph from './components/graph'
import Playground from './components/playground';

import mockData from './__mocks__/data.json';

const initialState = {
  width: 600,
  height: 400,
  minNegativeColor: 'red',
  maxNegativeColor: 'darkred',
  minPositiveColor: 'green',
  maxPositiveColor: 'darkgreen',
  isSingleColor: false,
  jsonData: mockData,
}

const App = () => {
  const [state, updateState] = React.useState(initialState);

  return (
    <div className="container">
      <div className="graph-container">
        <Graph
          graphData={state}
        />
      </div>
      <div className="playground-container">
        <Playground
          playgroundData={state}
          updateData={updateState}
        />
      </div>
    </div>
  )
}

export default App;
