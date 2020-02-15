import React, { Component, Text } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class Chart extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <table width="800" border="0">
          <tbody>
            <tr>
              <td colSpan="2" style={{ alignSelf: "left" }}>
                <LineChart
                  width={700}
                  height={300}
                  data={this.props.data}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="time" label={"second(s)"} dy={5} />
                  <YAxis
                    label={"click(s)"}                    
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="orange"
                    stroke="#ff9559"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="blue" stroke="#007aff" />
                </LineChart>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Chart;
