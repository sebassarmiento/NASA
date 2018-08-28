import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';



const API_UR = 'JsG393zPVDFLqXc7ZbnKHH6DYwpCi0OjFlWBsi81'

const API_URL = 'https://images-api.nasa.gov/search?q=apollo'

class App extends Component {
  constructor(){
    super()
    this.state = {}

    this.searchInput = React.createRef()

    this.url = 'https://images-api.nasa.gov/search?q='
    this.searchText = ''

    this.getData = this.getData.bind(this)
  }

  componentDidMount(){
    this.getData(API_URL)
  }

  getData(url){
    fetch(url).then(d => d.json()).then(resp => this.setState({
      data: resp
    }))
  }

  searchQuery(value){
    let newData = this.url + value
    this.getData(newData)
  }

  render() {

    const searchNode = this.searchInput.current

    return (
      <div className="App">
      <h1>EARTH PHOTOS</h1>

      <div style={{margin: 20, padding: 20 }} >
      <input type="text" placeholder="Search photos..." style={{fontSize: 20}} ref={this.searchInput} />
      <button onClick={() => this.searchQuery(searchNode.value) } style={{fontSize: 20}} >Search</button>
      </div>

      {
        this.state.data ? console.log(this.state.data) : <CircularProgress />
      }

      {
        this.state.data ? this.state.data.collection.items.map(item => {
          return ( <div key={Math.random()} ><img src={item.links ? item.links[0].href : null } height={100} alt={item.data[0].description } /></div> )
        }) : <CircularProgress />
      }

      </div>
    );
  }
}

export default App;
