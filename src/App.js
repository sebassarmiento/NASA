import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/main'
import Asteroids from './components/asteroids'
import Contact from './components/contact'
import Jobs from './components/jobs'
import Navigation from './components/nav'


class App extends Component {

  render() {
    return (
      <div className="App">
      <BrowserRouter >
      <div>
      <Navigation />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/about' component={Asteroids} exact />
        <Route path='/contact' component={Contact} exact />
        <Route path='/jobs' component={Jobs} exact />
      </Switch>
      </div>
      </BrowserRouter >
      </div>
    );
  }
}

export default App;
