import React from 'react';
import './App.css';

import Graph from './components/graph'
import Playground from './components/playground';

const initialState = {
  width: 600,
  height: 400,
  minNegativeColor: 'red',
  maxNegativeColor: 'darkred',
  minPositiveColor: 'green',
  maxPositiveColor: 'darkgreen',
  isSingleColor: false,
}

const App = () => {
  const [state, updateState] = React.useState(initialState);
  const [dummyWidth, updateDummyWidth] = React.useState();

  React.useLayoutEffect(() => {
    if(window){
      updateDummyWidth(
        ((window.innerWidth * (0.7)) - (state.width + 50)) / 2
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
          data={state}
          updateData={updateState}
        />
      </div>
    </div>
  )
}

export default App;
