import React from 'react';

import { validate } from './validation';
import './style.css'

function reducer(state, action){
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
    case 'update-is-single-color':
      return {...state, isSingleColor: action.payload}
    case 'update-state':
      return {...state, ...action.payload}
    default:
      return state;
  }
}

const Playground = ({
  data,
  updateData = () => {}
}) => {
  const [state, dispatch] = React.useReducer(reducer, data);
  const [errorMessage, updateErrorMessage] = React.useState();

  const handleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    if(name === 'update-width' || name === 'update-height') {
      value = Number(value);
    }
    dispatch({
      type: name,
      payload: value
    })
  }

  const handleUpdate = () => {
    const validationOp = validate(state);
    if(validationOp.isValid) {
      updateData({...state});
    }
    updateErrorMessage(validationOp.messages);
  }

  React.useEffect(()=> {
    dispatch({
      type: 'update-state',
      payload: data
    })
  },[data]);

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
          Enter negative color{state.isSingleColor ? '' : 's min - max'}
        </div>
        <div className="input-label-hints">
          Enter hex, name color or rgb value, <br/> Yes we are enough smart to understand what you want 😎
        </div>
        <div className="input-panels">
          <input
            type="text"
            value={state.minNegativeColor}
            name="update-min-negative-color"
            onChange={handleInputChange}
            className="input-box"
          />
          {
            !state.isSingleColor &&
            (
              <input
                type="text"
                value={state.maxNegativeColor}
                name="update-max-negative-color"
                onChange={handleInputChange}
                className="input-box"
              />
            )
          }
        </div>
      </div>

      <div className="user-input-container">
        <div className="input-label">
          Enter positive color{state.isSingleColor ? '' : 's min - max'}
        </div>
        <div className="input-label-hints">
          Enter hex, name color or rgb value, <br/> Yes we are enough smart to understand what you want 😎
        </div>
        <div className="input-panels">
          <input
            type="text"
            value={state.minPositiveColor}
            name="update-min-positive-color"
            onChange={handleInputChange}
            className="input-box"
          />
          {
            !state.isSingleColor &&
            (
              <input
                type="text"
                value={state.maxPositiveColor}
                name="update-max-positive-color"
                onChange={handleInputChange}
                className="input-box"
              />
            )
          }
        </div>
      </div>

      <div className="user-input-container check-box-container">
        <input
          type="checkbox"
          name="update-is-single-color"
          className="input-checkbox"
          defaultChecked={state.isSingleColor}
          onChange={handleInputChange}
        />
        <div className="checkbox-label">
          I would like to try out with one color each, <br />
          because I am boring 😐
        </div>
      </div>

      <div className="user-input-container align-center">
        <button
          className="update-button"
          onClick={handleUpdate}
        >
          Leviosa 💫
        </button>
      </div>

      {
        errorMessage &&
        (
          <div className="user-input-container align-center danger">
            {errorMessage}
          </div>
        )
      }
    </div>
  )
}

export default Playground;