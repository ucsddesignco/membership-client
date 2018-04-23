import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import QRReaderContainer from './QRReaderContainer';
import GoogleLoginButton from './GoogleLoginButton';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/">
            <header className="App-header">
              <h1 className="App-title">Design at UCSD Check In</h1>
            </header>
          </Link>
          <Switch>
            <Route
              exact
              path="/"
              handleStoreToken={this.storeToken}
              component={GoogleLoginButton}
            />
            <Route path="/checkin" component={QRReaderContainer} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
