import React from 'react';
import '../styles/App.css';
import ConnectionTestComponent from './ConnectionTestComponent'
import PrototypeComponent from './PrototypeComponenet';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Jezeli widzicie napis to znaczy ze udalo wam sie odpalić frontend!</h1>
          <ConnectionTestComponent/>
        </header>
        {/*Tutaj jest nasz nowy element*/}
        <PrototypeComponent/>
      </div>
    )
  }
}
