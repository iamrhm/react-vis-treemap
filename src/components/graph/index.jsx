import React from 'react';
import { Treemap } from 'react-vis';
import chroma from 'chroma-js';
import '../../../node_modules/react-vis/dist/style.css';

import mockData from '../../__mocks__/data.json';
import './style.css';

const Graph = () => {
  const negativeColorPallet = React.useRef();
  const positiveColorPallet = React.useRef();

  const populateColorPallet = (data) => {
    negativeColorPallet.current = negativeColorPallet.current || {
      data: [],
      colors: () => {}
    };
    positiveColorPallet.current = positiveColorPallet.current || {
      data: [],
      colors: () => {}
    };
    if(data < 0) {
      negativeColorPallet.current.data.push(data);
    } else {
      positiveColorPallet.current.data.push(data);
    }
  }

  const getTitleComponent = (title, displayValue, size) => {
    return (
      <div className="title-holder">
        <span className="title">{title}</span>
        <span className="display-value">{displayValue}</span>
        <span className="display-size">{Number(size).toFixed(2)}</span>
      </div>
    )
  }

  const getLeafData = () => {
    let leafData = (mockData || []).map((data) => {
      const freeFloat = !isNaN(Number(data['Free Float'])) ?
        Number(data['Free Float']) : Number(`${data['Free Float']}`.split(',').join(''));

      const returnAttribute = (Number(data['Return Attribution'].split('%')[0]));

      populateColorPallet(returnAttribute);

      return {
        title: getTitleComponent(
          data['Sector'],
          data['Return Attribution'],
          Math.abs(freeFloat * returnAttribute)
        ),
        size: Math.abs(freeFloat * returnAttribute),
        label: data['Sector'],
        returnAttribute: returnAttribute
      }
    });

    negativeColorPallet.current.data = negativeColorPallet.current.data.sort();
    positiveColorPallet.current.data = positiveColorPallet.current.data.sort();

    negativeColorPallet.current.colors = chroma.scale(['red', 'darkred']);
    positiveColorPallet.current.colors = chroma.scale(['green', 'darkgreen']);

    leafData = leafData.map((data) => {
      if(data.returnAttribute < 0) {
        data.color = negativeColorPallet.current.colors(
          (negativeColorPallet.current.data
            .findIndex(el => el === data.returnAttribute) + 1) /
            negativeColorPallet.current.data.length
        )
      } else {
        data.color = positiveColorPallet.current.colors(
          (positiveColorPallet.current.data
            .findIndex(el => el === data.returnAttribute) + 1) /
            positiveColorPallet.current.data.length
        )
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


  return (
    <div className="wrapper">
      <div className="header">
        Nifty 50 Sector Performance
      </div>
      <Treemap
        className='treemap-demo-container'
        colorType='literal'
        width={600}
        height={300}
        data={myData}
        mode='squarify'
        style= {{
          "border": '4px solid #ffffff',
          "display": "flex",
          "justifyContent": "center",
          "alignItems": "center",
        }}
        padding= {0}
      />
    </div>
  );
}

export default Graph;
