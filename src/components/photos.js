import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import '../css/photos.css';




const API_KEY = 'JsG393zPVDFLqXc7ZbnKHH6DYwpCi0OjFlWBsi81'

const API_URL = 'https://images-api.nasa.gov/search?q=supernova&media_type=image'

const styles = {
  mainGrid: { justifyContent: 'center', textAlign: 'center', alignItems: 'center', alignContent: 'center', width: '100%'},
  loader: { display: 'inline-block' },
  main: { textAlign:'center' },
  searchBar: { fontSize: 16, borderRadius: 10, border: '1px solid black', margin: 8, padding: 8, backgroundColor: '#f5f5f575', boxShadow: '1px 1px 4px white, 0 0 25px white, 0 0 5px white', textShadow: '1px 1px 4px white, 0 0 25px white, 0 0 5px white' },
  footerLink: { textDecoration: 'none', color: '#f5f5f5', margin: 30, padding: 20, marginTop:50 },
  btn: { margin: 14 , padding: 6, paddingLeft:18, paddingRight: 18 , fontSize: 16, fontFamily: 'nasalization-rg' , borderRadius: 10, backgroundColor: 'white', color: 'black', border: 'none', boxShadow: '1px 1px 4px white, 0 0 25px white, 0 0 5px white'  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {}

    this.searchInput = React.createRef()

    this.pageCount = 1

    this.url = 'https://images-api.nasa.gov/search?q='

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
    let newData = this.url + value.toLowerCase() + '&media_type=image'
    value ? this.getData(newData) : console.log('No input value')
  }

  showLink(val){
    console.log(val)
  }

  render() {

    const searchNode = this.searchInput.current

    return (
      <div>
        <h1 className="nasa" >NASA LIBRARY</h1>

        <div style={{ margin: 20, padding: 20 }} >

          <input type="text" placeholder="Search photos..." style={styles.searchBar} ref={this.searchInput} />
          <button onClick={() => this.searchQuery(searchNode.value)} style={styles.btn} >SEARCH</button>
        </div>

        {
          this.state.data ? console.log(this.state.data) : null
        }

        {
          this.state.data && this.state.data.collection.items.length ? <h3>Showing {this.pageCount * 100 - 100 + 1}-{this.state.data.collection.items.length === 100 ? this.state.data.collection.items.length * this.pageCount : this.state.data.collection.metadata.total_hits} of {this.state.data.collection.metadata.total_hits} </h3> : <h3>Oops! No matching results for '{searchNode ? searchNode.value : null}'</h3>
        }

        {
          this.state.data && this.state.data.collection.items.length ? <h4>Results for '{searchNode.value ? searchNode.value : 'Supernova'}' </h4> : null
        }

        <Grid container style={styles.mainGrid}>

            {
              this.state.data ? this.state.data.collection.items.map(item => {
                return (

                  item.data[0].media_type === 'image' ? 
                  <Grid item key={Math.random()} style={{margin: 'auto'}} onClick={() => this.showLink(item.links[0].href)} >
                    
                      <img src={item.links[0].href} alt={item.data[0].description_508} style={{ maxHeight: 200}} />
                    
                  </Grid>

                  : console.log('Not image')

                  
                )
              }) : <CircularProgress color="inherit" />
            }

        </Grid>

        {
          this.state.data && this.state.data.collection.links ? this.state.data.collection.links.map(link => {
            return <button key={link.rel} onClick={() => this.loadNextPage(link.href, link.rel) } style={styles.btn} > {link.prompt} </button>
          } ) : console.log('No btn')
        }

        {
          this.state.data ? <footer style={{margin: 20, padding: 20}} >
          <a href="/" style={styles.footerLink} >Home</a>
          <a href="/asteroids" style={styles.footerLink} >Asteroids</a>
          <a href="/photos" style={styles.footerLink} >Photos</a>
          <a href="/iss" style={styles.footerLink} >Space Station</a>
        </footer> : null
        }

      </div>
    );
  }
}

export default App;
