import React from 'react';

import './style.css';

const objSchema = {
  "Sector": "",
  "Return Attribution": "",
  "Free Float": ""
}

const JSONEditor = ({
  inputJSON,
  updateJSON = () => {}
}) => {
  const [state, updateState] = React.useState(inputJSON || []);
  const [isUpdated, toggleUpdate] = React.useState(false);

  const updateJsonValue = (e, key, valuePointer) => {
    const newState = [...state];
    newState[valuePointer] = {...newState[valuePointer], [key]: e.target.value }
    updateState(newState);
    toggleUpdate(true);
  }

  const addValue = (e) => {
    e.stopPropagation();
    updateState([...state, objSchema]);
    toggleUpdate(true);
  }

  const deleteJsonValue = (index) => {
    const newState = [...state].filter((data,idx) =>  idx !== index);
    updateState(newState);
    toggleUpdate(true);
  }

  const getJSONHolder = (
    obj = {
    ...objSchema
    },
    valuePointer = 0
  ) => {
    return (
      <div className="json-blocks">
        <span className="display-key-value braces">&#123;</span> <br/>
          <div className="json-values-display">
            {
              Object.keys(obj).map((key, index) => (
                <div className="row" key={index}>
                  <span className="display-key-value">{key}:</span>
                  <span>
                    <input
                      type="text"
                      className="json-input-box"
                      value={obj[key]}
                      onChange={(e) => updateJsonValue(e, key, valuePointer)}
                    />
                  </span>
                </div>
              ))
            }
          </div>
        <span className="display-key-value braces">&#125;</span>
        <div className="json-delete" onClick={() => deleteJsonValue(valuePointer)}>
          <span class="material-icons icon-styles">
            delete
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className='json-editor-container'>
      {
        state.map((obj, index)=>
          (
            <React.Fragment
              key={index}
            >
              {getJSONHolder(obj, index)}
            </React.Fragment>
          )
        )
      }
      <div className="add-button-container">
        <div className="add-button" onClick={(e) => addValue(e)}>
          <span class="material-icons add-style">
            add
          </span>
        </div>
        {
          isUpdated &&
          <div
            className='json-editor-message'
            onClick={() => {
                updateJSON(state)
                toggleUpdate(false)
              }}
          >
            validate
          </div>
        }
      </div>


    </div>
  )
}

export default JSONEditor;