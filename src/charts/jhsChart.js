import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'JHS 1',
    boys: 4000,
    girls: 2400,
    amt: 2400,
  },
  {
    name: 'JHS 2',
    boys: 3000,
    girls: 1398,
    amt: 2210,
  },
  {
    name: 'JHS 3',
    boys: 2000,
    girls: 9800,
    amt: 2290,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/q4eonc12/';

  render() {
    return (
      <ResponsiveContainer width="90%" height={300}>
        <BarChart
          width={500}
          data={data}
          margin={{
            top: 20,
            right: 5,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="boys" fill="#8884d8" />
          <Bar dataKey="girls" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
