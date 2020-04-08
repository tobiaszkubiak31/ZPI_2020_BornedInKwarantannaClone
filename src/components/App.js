import React from 'react';
import logo from '../logo.jpg';
import '../styles/App.css';
import ConnectionTestComponent from './ConnectionTestComponent'

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Jezeli widzicie obrazek i napis to znaczy ze udalo wam sie odpalić frontend!</h1>
          <ConnectionTestComponent/>
        </header>
      </div>
    )
  }
}
