import React, { Component } from 'react';


const API_URL = 'https://api.nasa.gov/neo/rest/v1/neo/2162038?api_key=JsG393zPVDFLqXc7ZbnKHH6DYwpCi0OjFlWBsi81'

class App extends Component {
  constructor(){
    super()
    this.state = {}
  }

  componentDidMount(){
    fetch(API_URL).then(d => d.json()).then(resp => console.log(resp))
  }

  render() {
    return (
      <div className="App">
      <h1>CONTACT</h1>
      </div>
    );
  }
}

export default App;
