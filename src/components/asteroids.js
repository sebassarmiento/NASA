import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const API_URL = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=JsG393zPVDFLqXc7ZbnKHH6DYwpCi0OjFlWBsi81'


class Asteroids extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    fetch(API_URL).then(d => d.json()).then(resp => this.setState({
      data: resp
    }))
  }

  render() {
    return (
      <div className="App">
        <h1>ASTEROIDS</h1>

        <Grid container style={{padding: 20}} spacing={32} >

        {
          this.state.data ? this.state.data.near_earth_objects.map(ast => {
            return (
              <Grid item sm={6} key={ast.neo_reference_id} >
              <Paper>
                <h1>{ast.name}</h1>
                <h2>Diameter: {ast.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)}km - {ast.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}km </h2>
                <h2>Dangerous: {ast.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</h2>
                <h2>Velocity: {ast.close_approach_data.length !== 0 ? ast.close_approach_data[0].relative_velocity.kilometers_per_second : <span>Unknown</span> } km/h </h2>
              </Paper>
              </Grid>
            )
          }) : <CircularProgress />
        }

        {
          this.state.data ? console.log(this.state.data) : null
        }

        </Grid>

      </div>
    );
  }
}

export default Asteroids;
