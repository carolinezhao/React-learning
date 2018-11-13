import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function sayHi(name) {
  return <span className="special">Hi, {name}.</span>
}

const greeting = (
  <div>
    <p><code>React</code> Learning</p>
    <p>{sayHi('Caroline')} Let's get started.</p>
  </div>
)

class StatfulLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }
  handleClick() {
    this.setState({
      active: !this.state.active
    })
  }
  render() {
    return (<a style={{color: this.state.active ? '#f66' : 'yellow'}} onClick={this.handleClick.bind(this)} href='###'>Stateful Link</a>)
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {greeting}
          <StatfulLink></StatfulLink>
        </header>
      </div>
    );
  }
}

export default App;