import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../css/asteroids.css';


let date = new Date()

let year = date.getFullYear()

let month = ('0' + (date.getMonth() + 1 )).slice(-2)

let day = ('0' + date.getDate()).slice(-2)

let myDate = year + '-' + month + '-' + day

const API_URL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + myDate + '&end_date=' + myDate + '&api_key=JsG393zPVDFLqXc7ZbnKHH6DYwpCi0OjFlWBsi81'

const styles = {
  paper: { paddingTop: 20, paddingBottom: 20 },
  loader: { textAlign: 'center', margin: 50 },

  btn: { margin: 20 ,padding: 10, paddingLeft:20, paddingRight: 20 , fontSize: 20, fontFamily: 'Arial', borderRadius: 10, backgroundColor: 'black', color: 'white', border: 'none' },

  btnDisabled: {  margin: 20 ,padding: 10, paddingLeft:20, paddingRight: 20 , fontSize: 20, fontFamily: 'Arial', borderRadius: 10, backgroundColor: 'grey', color: 'white', border: 'none'  },
  
  footerLink: { textDecoration: 'none', color: 'black', margin: 30, padding: 20, marginTop:50 }
}

class Asteroids extends Component {
  constructor() {
    super()
    this.state = {}

    this.selectSort = React.createRef()

    this.astArray = []
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

  sortBy(value){
    const newData = this.state.data

    value === 'vel' ? this.state.data.near_earth_objects[myDate].sort((a, b) => b.close_approach_data[0].relative_velocity.kilometers_per_hour - a.close_approach_data[0].relative_velocity.kilometers_per_hour ) : null
    value === 'dia' ? this.state.data.near_earth_objects[myDate].sort((a, b) => b.estimated_diameter.kilometers.estimated_diameter_max - a.estimated_diameter.kilometers.estimated_diameter_max ) : null
    value === 'dis' ? this.state.data.near_earth_objects[myDate].sort((a, b) => b.close_approach_data[0].miss_distance.kilometers - a.close_approach_data[0].miss_distance.kilometers ) : null
    
    this.setState({
      data: newData
    })
  }

  render() {

    const selectNode = this.selectSort.current

    return (
      <div>
        <h1 style={{color: 'white'}} >NUMBER OF CLOSE TO EARTH ASTEROIDS TODAY: { this.state.data ? this.state.data.element_count : null } </h1>

        <h3 style={{color: 'white'}} >Sort by: 
          <select ref={this.selectSort} >
            <option value="vel" >Velocity</option>
            <option value="dia" >Diameter</option>
            <option value="dis" >Distance</option>
          </select> <button onClick={() => this.sortBy(selectNode.value) } >Sort</button> </h3>

        <Grid container style={{ padding: 20 }} spacing={32} >

          {
            this.state.data ? this.state.data.near_earth_objects[myDate].map(ast => {
              return (
                <Grid item sm={6} key={ast.neo_reference_id} >
                  <Paper style={styles.paper} >
                    <h1>{ast.name}</h1>
                    <h2>Diameter: {ast.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} km - {ast.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}  km </h2>
                    <h2>Dangerous: {ast.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</h2>
                    <h2>Velocity: {ast.close_approach_data.length !== 0 ? parseFloat(ast.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2) : <span>Unknown</span>} km/h </h2>
                    <h2>Distance from earth: {ast.close_approach_data.length !== 0 ? ast.close_approach_data[0].miss_distance.kilometers : <span>Unknown</span> } km </h2>
                  </Paper>
                </Grid>
              )
            }) : <CircularProgress style={styles.loader} />
          }

          {
            this.state.data ? console.log(this.state.data) : null
          }

        </Grid>

        <footer>
          <a href="/" style={styles.footerLink} >Home</a>
          <a href="/asteroids" style={styles.footerLink} >Asteroids</a>
          <a href="/contact" style={styles.footerLink} >Contact</a>
        </footer>

      </div>
    );
  }
}

export default Asteroids;
