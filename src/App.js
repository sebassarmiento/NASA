import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/main'
import Asteroids from './components/asteroids'
import Contact from './components/contact'
import Jobs from './components/jobs'
import Navigation from './components/nav'

const styles = {
  App: { textAlign: 'center' }
}


class App extends Component {

  render() {
    return (
      <div style={styles.App} >
      <BrowserRouter >
      <div>
      <Navigation />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/asteroids' component={Asteroids} exact />
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
