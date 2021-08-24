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
  const [dummyWidth, updateDummyWidth] = React.useState();

  React.useLayoutEffect(() => {
    if(window){
      const coefficient = window.innerWidth > 991 ? 0.7 : 1;
      updateDummyWidth(
        ((window.innerWidth * coefficient) - (state.width + 50)) / 2
      );
    }
  }, [state.width]);

  return (
    <div className="container">
      <div className="graph-container">
        <div className="dummy-padding"
          style={{
            "width": `${dummyWidth}px`
          }}
        />
        <Graph
          graphData={state}
        />
        <div className="dummy-padding"
          style={{
            "width": `${dummyWidth}px`
          }}
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
