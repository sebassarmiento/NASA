import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';



const API_URL = 'https://api.nasa.gov/planetary/earth/imagery?lon=100.75&lat=1.5&date=2014-02-01&cloud_score=True&api_key=JsG393zPVDFLqXc7ZbnKHH6DYwpCi0OjFlWBsi81'

class App extends Component {
  constructor(){
    super()
    this.state = {}
  }

  componentDidMount(){
    fetch(API_URL).then(d => d.json()).then(resp => this.setState({
      data: resp
    }))
  }

  render() {
    return (
      <div className="App">
      <h1>CONTACT</h1>

      {
        this.state.data ? console.log(this.state.data) : null
      }

      {
        this.state.data ? <img src={this.state.data.url} /> : <CircularProgress />
      }

      </div>
    );
  }
}

export default App;
