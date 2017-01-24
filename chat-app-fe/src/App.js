import React, { Component } from 'react';
import './App.css';
import Root from './Root';
import store from './store';

class App extends Component {
  render() {
    return (<Root store={store}/>);
  }
}

export default App;
