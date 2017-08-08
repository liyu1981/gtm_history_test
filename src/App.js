import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const queryParams = (params) => {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + params[k])
    .join('&');
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      step: 0,
      selection: {
        color: 'red',
        size: 'm',
        type: 'sedan',
        grade: 'car',
      },
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome</h2>
        </div>
        <p className="App-intro"> 
          Please make your selection
        </p>
        <div>{this.state.step <= 3 ? this._getStepOptions() : "all done!"}</div>
      </div>
    );
  }

  _getStepOptions() {
    let all = {
      0: (
        <select id="color" onChange={this._onSelectChange.bind(this)} defaultValue={this.state.selection.color}>
          <option value="red">red</option>
          <option value="blue">blue</option>
        </select>
      ),
      1: (
        <select id="size" onChange={this._onSelectChange.bind(this)} defaultValue={this.state.selection.size}>
          <option value="m">M</option>
          <option value="xl">XL</option>
        </select>
      ),
      2: (
        <select id="type" onChange={this._onSelectChange.bind(this)} defaultValue={this.state.selection.type}>
          <option value="sedan">sedan</option>
          <option value="haltch">haltch</option>
        </select>
      ),
      3: (
        <select id="grade" onChange={this._onSelectChange.bind(this)} defaultValue={this.state.selection.grade}>
          <option value="car">CAR</option>
          <option value="suv">SUV</option>
          <option value="pickup">PICKUP</option>
        </select>
      )
    };
    return <div>
      Option {this.state.step}, please make a choice: 
      <div>
        {all[this.state.step]}
        <button onClick={this._onNext.bind(this)}>next</button>
      </div>
    </div>;
  }

  _onSelectChange(event) {
    let newSelection = Object.assign({}, this.state.selection);
    newSelection[event.target.id] = event.target.value;
    this.setState({ selection: newSelection });
  }

  _onNext() {
    let newStep = this.state.step + 1;
    this.setState({ step: newStep });
    this._changeURL(newStep, this.state.selection);
  }

  _changeURL(step, selection) {
    let params = queryParams(this.state.selection);
    let url = window.location.href.substr(0, window.location.href.indexOf('?'));
    let urlWithHash = `${url}?step=${this.state.step}&${params}`;
    window.history.pushState(null, null, urlWithHash);
  }

}

export default App;
