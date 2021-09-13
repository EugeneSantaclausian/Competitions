import React from 'react';
import CanvasJSReact from '../assets/canvas/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const allStudents = () => {
  const options = {
    title: {
      text: '',
    },
    data: [
      {
        type: 'column',
        dataPoints: [
          { label: 'Primary 1', y: 10 },
          { label: 'Primary 2', y: 15 },
          { label: 'Primary 3', y: 25 },
          { label: 'Primary 4', y: 30 },
          { label: 'Primary 5', y: 28 },
          { label: 'Primary 6', y: 48 },
        ],
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef = {ref => this.chart = ref} */
      />
    </div>
  );
};

export default allStudents;
