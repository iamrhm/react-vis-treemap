import React from 'react';
import './style.css'

const initialState = {
  width: 600,
  height: 400,
  minNegativeColor: 'red',
  maxNegativeColor: 'darkred',
  minPositiveColor: 'green',
  maxPositiveColor: 'darkgreen',
}

function reducer(state = {
  ...initialState
}, action){
  switch(action.type){
    case 'update-min-negative-color':
      return {...state, minNegativeColor: action.payload}
    case 'update-max-negative-color':
      return {...state, maxNegativeColor: action.payload}
    case 'update-min-positive-color':
      return {...state, minPositiveColor: action.payload}
    case 'update-max-positive-color':
      return {...state, maxPositiveColor: action.payload}
    case 'update-width':
      return {...state, width: action.payload}
    case 'update-height':
      return {...state, height: action.payload}
    default:
      return state;
  }
}

const Playground = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({
      type: name,
      payload: value
    })
  }

  const handleUpdate = () => {
    console.log(state);
  }

  return(
    <div className="user-playground-container">
      <div className="user-input-container">
        <div className="input-label">
          Enter treemap dimensions (width x height)
        </div>
        <div className="input-panels">
          <input
            type="number"
            value={state.width}
            name="update-width"
            onChange={handleInputChange}
            className="input-box"
          />
          <input
            type="number"
            value={state.height}
            name="update-height"
            onChange={handleInputChange}
            className="input-box"
          />
        </div>
      </div>

      <div className="user-input-container">
        <div className="input-label">
          Enter negative colors min - max
        </div>
        <div className="input-panels">
          <input
            type="text"
            value={state.minNegativeColor}
            name="update-min-negative-color"
            onChange={handleInputChange}
            className="input-box"
          />
          <input
            type="text"
            value={state.maxNegativeColor}
            name="update-max-negative-color"
            onChange={handleInputChange}
            className="input-box"
          />
        </div>
      </div>

      <div className="user-input-container">
        <div className="input-label">
          Enter positive colors min - max
        </div>
        <div className="input-panels">
          <input
            type="text"
            value={state.minPositiveColor}
            name="update-min-positive-color"
            onChange={handleInputChange}
            className="input-box"
          />
          <input
            type="text"
            value={state.maxPositiveColor}
            name="update-max-positive-color"
            onChange={handleInputChange}
            className="input-box"
          />
        </div>
      </div>

      <div className="user-input-container align-center">
        <button
          className="update-button"
          onClick={handleUpdate}
        >
          Now Show Me the Magic
        </button>
      </div>
    </div>
  )
}

export default Playground;