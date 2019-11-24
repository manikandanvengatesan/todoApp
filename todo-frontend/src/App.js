import React, {Component} from 'react';
import Home from './components/Home.js';
import Login from './components/Login.js';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/home" render={() => (
              !localStorage.getItem('user_id') ? (
                window.location = '/'
              ) : (
                <Home history= {this.props.history}/>
              )
            )}/>
        </div>
      </Router>
    );
  }
}

export default App;
