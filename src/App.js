import React, { Component } from "react";
import "./styles.css";
import Chart from "./Chart";

class App extends Component {
  constructor(props) {
    super(props);
    this.changeTotalTime = this.changeTotalTime.bind(this);
    this.changeInterval = this.changeInterval.bind(this);
    this.state = {
      timerOn: 0,
      totalTime: 10, //total time to count no of clicks
      timeInt: 1, //time interval to count no of clicks
      minus: 0,
      plus: 0,
      orange: 0,
      blue: 0,
      index: 1,
      minusCnts: [0],
      plusCnts: [0],
      data: [],
      disabled: false,
      message: ""
    };
  }

  //timer start
  startTimer = () => {
    if (this.state.timerOn === 0) {
      console.log(
        "Total time: " +
          this.state.totalTime +
          ", Time iInterval: " +
          this.state.timeInt
      );

      this.interval = setInterval(() => this.tick(), this.state.timeInt * 1000);
    } else {
      this.setState({ timerOn: 1 });
    }
  };

  tick() {
    var intCnt = this.state.totalTime / this.state.timeInt;

    if (this.state.index <= intCnt) {
      this.saveButtonClicks(this.state.index);
      this.setState({ index: this.state.index + 1 });
    } else {
      clearInterval(this.interval);
      //this.showButtonClicks();
      this.refreshChart(
        intCnt,
        this.state.timeInt,
        this.state.minusCnts,
        this.state.plusCnts
      );

      this.setState({ message: "Time is up!" });
      this.setState({ disabled: true });
      //this.resetButtons();
    }

    this.setState({ minus: 0 });
    this.setState({ plus: 0 });
  }
  /*
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), this.state.timeInt * 1000);
  }
*/
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  //timer end

  clickMinus = () => {
    if (!this.state.disabled) {
      if (this.state.index === 1) {
        this.setState({ message: "Start!" });
      }

      this.startTimer();
      this.setState({
        minus: this.state.minus + 1,
        orange: this.state.orange + 1
      });
    }
  };

  clickPlus = () => {
    if (!this.state.disabled) {
      if (this.state.index === 1) {
        this.setState({ message: "Start!" });
      }

      this.startTimer();
      this.setState({
        plus: this.state.plus + 1,
        blue: this.state.blue + 1
      });
    }
  };

  getCurDteTme = () => {
    var tempDate = new Date();
    var date =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate() +
      " " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes() +
      ":" +
      tempDate.getSeconds();
    return date;
  };

  saveButtonClicks = i => {
    /*
    console.log(
      "i=" +
        i +
        ", Time=" +
        this.getCurDteTme() +
        ", Orange=" +
        this.state.minus +
        ", Blue=" +
        this.state.plus
    );*/

    this.state.minusCnts.push(this.state.minus);
    this.state.plusCnts.push(this.state.plus);
  };

  showButtonClicks = () => {
    console.log(
      "Orange: " + this.state.minusCnts + ", Blue: " + this.state.plusCnts
    );
  };

  refreshChart = (intCnt, timeInt, minusCnts, plusCnts) => {
    var newData = [{ time: 0, orange: 0, blue: 0 }];
    for (let i = 1; i <= intCnt; i++) {
      /*
      console.log(
        "i=" +
          i / 2 +
          ", minusCnts=" +
          this.state.minusCnts[i] +
          ", plusCnts=" +
          this.state.plusCnts[i]
      );*/

      newData.push({
        time: i * timeInt,
        orange: minusCnts[i],
        blue: plusCnts[i]
      });
    }

    this.setState({ data: newData });
  };

  changeTotalTime(e) {
    this.setState({ totalTime: e.target.value });
    console.log("totalTime=" + e.target.value);
  }

  changeInterval(e) {
    this.setState({ period: e.target.value });
    console.log("Interval=" + e.target.value);
  }

  render() {
    return (
      <div className="App">
        <Chart data={this.state.data} />
        <br />
        <br />
        <table width="500" border="0">
          <tbody>
            <tr style={{ display: "none" }}>
              <td colSpan="2">
                Total time of button clicks:&nbsp;
                <select onChange={this.changeTotalTime}>
                  <option value="5">5</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                </select>
                &nbsp;sec
                <br />
                <br />
                Time interval to count button clicks:&nbsp;
                <select onChange={this.changeInterval}>
                  <option value="0.5">0.5</option>
                  <option value="1">1</option>
                  <option value="5">5</option>
                </select>
                &nbsp;sec
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <h3>{this.state.message}</h3>
              </td>
            </tr>
            <tr>
              <td>No of click(s): {this.state.orange}</td>
              <td>No of click(s): {this.state.blue}</td>
            </tr>
            <tr>
              <td>
                <button
                  onClick={this.clickMinus}
                  className="button round orange"
                >
                  -
                </button>
              </td>
              <td>
                <button onClick={this.clickPlus} className="button round blue">
                  +
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <br />
                <button
                  className="resetButton"
                  onClick={() => window.location.reload(false)}
                >
                  Reset
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
