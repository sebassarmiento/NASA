import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../css/asteroids.css';


const API_URL = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=JsG393zPVDFLqXc7ZbnKHH6DYwpCi0OjFlWBsi81'

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

  render() {
    return (
      <div>
        <h1 style={{color: 'white'}} >ASTEROIDS</h1>

        <Grid container style={{ padding: 20 }} spacing={32} >

          {
            this.state.data ? this.state.data.near_earth_objects.map(ast => {
              return (
                <Grid item sm={6} key={ast.neo_reference_id} >
                  <Paper style={styles.paper} >
                    <h1>{ast.name}</h1>
                    <h2>Diameter: {ast.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} km - {ast.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}  km </h2>
                    <h2>Dangerous: {ast.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</h2>
                    <h2>Velocity: {ast.close_approach_data.length !== 0 ? parseFloat(ast.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2) : <span>Unknown</span>} km/h </h2>
                  </Paper>
                </Grid>
              )
            }) : <CircularProgress style={styles.loader} />
          }

          {
            this.state.data ? console.log(this.state.data) : null
          }

        </Grid>

        {
          this.state.data ? (this.state.data.links.prev ? <button onClick={() => this.getData(this.state.data.links.prev)} style={styles.btn} >Prev</button> : <button className="disabled" style={styles.btnDisabled} >Prev</button>) : null
        }

        {
          this.state.data ?
            <button onClick={() => this.getData(this.state.data.links.next)} style={styles.btn} >Next</button> : null
        }

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
