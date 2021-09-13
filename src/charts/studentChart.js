import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'P.1',
    boys: 4000,
    girls: 2400,
    total: 2400,
  },
  {
    name: 'P.2',
    girls: 3000,
    boys: 1398,
    total: 2210,
  },
  {
    name: 'P.3',
    girls: 2000,
    boys: 9800,
    total: 2290,
  },
  {
    name: 'P.4',
    girls: 2780,
    boys: 3908,
    total: 2000,
  },
  {
    name: 'P.5',
    girls: 1890,
    boys: 4800,
    total: 2181,
  },
  {
    name: 'P.6',
    girls: 2390,
    boys: 3800,
    total: 2500,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
      <ResponsiveContainer width="90%" height={300}>
        <LineChart
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
          <Line
            type="monotone"
            dataKey="boys"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="girls" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
