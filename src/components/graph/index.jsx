import React from 'react';
import { Treemap } from 'react-vis';
import chroma from 'chroma-js';
import '../../../node_modules/react-vis/dist/style.css';

import mockData from '../../__mocks__/data.json';
import './style.css';

const Graph = ({
  graphData
}) => {
  const negativeColorPallet = React.useRef();
  const positiveColorPallet = React.useRef();

  const negativeColorRange = React.useRef();
  const positiveColorRange = React.useRef();

  const populateColorValues = (data) => {
    if(data < 0) {
      negativeColorPallet.current.data.add(data);
    } else {
      positiveColorPallet.current.data.add(data);
    }
  }

  const getTitleComponent = (title, displayValue, size) => {
    const returnAttribute = (Number(displayValue.split('%')[0]));
    const sign = Math.sign(returnAttribute) < 0 ? '⬇️' :
      (Math.sign(returnAttribute) === 0 ? '' : '⬆️')
    return (
      <div className="title-holder">
        <span className="title">{title}</span>
        <span className="display-value">
          {sign} &nbsp;
          {Math.abs(returnAttribute)}
        </span>
        <span className="display-size">▉ {Number(size).toFixed(2)}</span>
      </div>
    )
  }

  const getLeafData = () => {
    negativeColorPallet.current = {
      data: new Set(),
      colors: () => {}
    };
    positiveColorPallet.current = {
      data: new Set(),
      colors: () => {}
    };

    let leafData = (mockData || []).map((data) => {
      const freeFloat = !isNaN(Number(data['Free Float'])) ?
        Number(data['Free Float']) :
        Number(`${data['Free Float']}`.split(',').join(''));
      const returnAttribute = (Number(data['Return Attribution'].split('%')[0]));
      populateColorValues(returnAttribute);
      return {
        title: getTitleComponent(
          data['Sector'],
          data['Return Attribution'],
          Math.abs(freeFloat * (returnAttribute+1))
        ),
        size: Math.abs(freeFloat * (returnAttribute+1)),
        label: data['Sector'],
        returnAttribute: returnAttribute
      }
    });
    negativeColorPallet.current.data = [...negativeColorPallet.current.data].sort();
    positiveColorPallet.current.data = [...positiveColorPallet.current.data].sort();
    leafData.sort((a, b) => (a.returnAttribute > b.returnAttribute ? -1 : 1))

    negativeColorPallet.current.colors = chroma.scale(
      [graphData.minNegativeColor, graphData.maxNegativeColor]
    );
    positiveColorPallet.current.colors = chroma.scale(
      [graphData.minPositiveColor, graphData.maxPositiveColor]
    );

    negativeColorRange.current = new Set();
    positiveColorRange.current = new Set();

    leafData = leafData.map((data) => {
      if(data.returnAttribute < 0) {
        if(graphData.isSingleColor) {
          data.color = chroma(graphData.minNegativeColor).hex();
        } else {
          data.color = negativeColorPallet.current.colors(
            (negativeColorPallet.current.data
              .findIndex(el => el === data.returnAttribute) + 1) /
              negativeColorPallet.current.data.length
          )
        }
        negativeColorRange.current.add(data.color);
      } else if(data.returnAttribute > 0) {
        if(graphData.isSingleColor) {
          data.color = chroma(graphData.minPositiveColor).hex();
        } else {
          data.color = positiveColorPallet.current.colors(
            (positiveColorPallet.current.data
              .findIndex(el => el === data.returnAttribute) + 1) /
              positiveColorPallet.current.data.length
          )
        }
        positiveColorRange.current.add(data.color);
      } else {
        data.color = '#e4e4e4'
      }
      return data;
    });

    return leafData;
  }

  const myData = {
    title: "",
    colorType: 'literal',
    children: getLeafData(),
  }

  const getColorPalette = () => {
    return(
      <>
        <div className="color-details">
          <div  className="title-color-palette">
            Negative Colors <br/> {!graphData.isSingleColor ? '(minInputVal → maxInputVal)' : ''}
          </div>
          <div className="negative-palette">
            {
              [...negativeColorRange.current]
              .map((color, idx) => (
                <div
                  className="color-box"
                  key={idx}
                  style={{
                    backgroundColor: color
                  }}
                />
              ))
            }
          </div>
        </div>
        <div className="color-details">
          <div  className="title-color-palette">
            Positive Colors <br/> {!graphData.isSingleColor ? '(minInputVal → maxInputVal)' : ''} &nbsp;
          </div>
          <div className="positive-palette">
            {
              [...positiveColorRange.current]
              .map((color, idx) => (
                <div
                  className="color-box"
                  key={idx}
                  style={{
                    backgroundColor: color
                  }}
                />
              ))
            }
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="graph-fold">
      <div className="wrapper">
        <div className="header">
          Nifty 50 Sector Performance
        </div>
        <Treemap
          animation={true}
          className='treemap-demo-container'
          colorType='literal'
          width={graphData.width}
          height={graphData.height}
          data={myData}
          mode='squarify'
          style= {{
            "border": '2px solid #ffffff',
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
          }}
          padding= {0}
        />
      </div>

      <div className="color-pallet">
        {getColorPalette()}
      </div>
    </div>
  );
}

export default Graph;
