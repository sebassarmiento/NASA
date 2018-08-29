import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import '../css/photos.css';




const API_KEY = 'JsG393zPVDFLqXc7ZbnKHH6DYwpCi0OjFlWBsi81'

const API_URL = 'https://images-api.nasa.gov/search?q=apollo'

const styles = {
  mainGrid: { justifyContent: 'center', textAlign: 'center', alignItems: 'center', alignContent: 'center'},
  loader: { display: 'inline-block' },
  main: { textAlign:'center' },
  searchBar: { fontSize: 16, borderRadius: 10, border: '1px solid black', margin: 8, padding: 8},
  btn: { padding: 6, paddingLeft:18, paddingRight: 18 , fontSize: 18, fontFamily: 'Arial', borderRadius: 10, backgroundColor: 'black', color: 'white', border: 'none'  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {}

    this.searchInput = React.createRef()

    this.pageCount = 1

    this.url = 'https://images-api.nasa.gov/search?q='
    this.searchText = ''

    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.getData(API_URL)
  }

  getData(url) {
    fetch(url).then(d => d.json()).then(resp => this.setState({
      data: resp
    }))
  }

  loadNextPage(url, btnClicked){
    this.setState({
      data: null
    })
    fetch(url).then(d => d.json()).then(resp => this.setState({
      data: resp
    }))
    btnClicked === 'next' ? this.pageCount++ : this.pageCount--
    console.log(btnClicked)
  }

  searchQuery(value) {
    this.pageCount = 1
    let newData = this.url + value
    value ? this.getData(newData) : console.log('No input value')
  }

  render() {

    const searchNode = this.searchInput.current

    return (
      <div>
        <h1>EARTH PHOTOS</h1>

        <div style={{ margin: 20, padding: 20 }} >

          <input type="text" placeholder="Search photos..." style={styles.searchBar} ref={this.searchInput} />
          <button onClick={() => this.searchQuery(searchNode.value)} style={styles.btn} >Search</button>
        </div>

        {
          this.state.data ? console.log(this.state.data) : null
        }

        {
          this.state.data ? <h3>Showing {this.pageCount * 100 - 100 + 1}-{this.state.data.collection.items.length * this.pageCount} of {this.state.data.collection.metadata.total_hits} </h3> : null
        }

        <Grid container style={styles.mainGrid} >

            {
              this.state.data ? this.state.data.collection.items.map(item => {
                return (

                  item.links ? 
                  <Grid item key={Math.random()} style={{margin: 'auto'}} >
                    
                      <img src={item.links[0].href} alt={item.data[0].description_508} style={{ maxHeight: 200}} />
                    
                  </Grid>

                  : null

                  
                )
              }) : <CircularProgress />
            }

        </Grid>

        {
          this.state.data && this.state.data.collection.links ? this.state.data.collection.links.map(link => {
            return <button onClick={() => this.loadNextPage(link.href, link.rel) } style={styles.btn} > {link.prompt} </button>
          } ) : console.log('No btn')
        }

      </div>
    );
  }
}

export default App;
