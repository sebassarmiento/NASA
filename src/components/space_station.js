import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../css/asteroids.css';



const API_URL1 = 'http://api.open-notify.org/iss-now.json'

const API_URL2 = 'http://api.open-notify.org/astros.json'

const styles = {
  paper: { paddingTop: 20, paddingBottom: 20 },
  loader: { textAlign: 'center', margin: 50 },

  btn: { margin: 20, padding: 10, paddingLeft: 20, paddingRight: 20, fontSize: 20, fontFamily: 'Arial', borderRadius: 10, backgroundColor: 'black', color: 'white', border: 'none' },

  btnDisabled: { margin: 20, padding: 10, paddingLeft: 20, paddingRight: 20, fontSize: 20, fontFamily: 'Arial', borderRadius: 10, backgroundColor: 'grey', color: 'white', border: 'none' },

  footerLink: { textDecoration: 'none', color: 'white', margin: 30, padding: 20, marginTop: 50 }
}

class ISS extends Component {
  constructor() {
    super()
    this.state = {}
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.getData(API_URL1)
    this.getData(API_URL2, 1)
  }

  getData(url, sec) {
    !sec ? fetch(url).then(d => d.json()).then(resp => this.setState({
      data: resp
    })) : fetch(url).then(d => d.json()).then(resp => this.setState({
      people: resp
    }))
  }

  render() {

    return (
      <div>

        {
          this.state.data ? <div><h2>The current location of the International Space Station (ISS) is:</h2>
            <h3>{this.state.data.iss_position.latitude} Latitude</h3>
            <h3>{this.state.data.iss_position.longitude} Longitude</h3></div> : null
        }

        {
          this.state.people ? <h2>There are currently {this.state.people.number} people in space right now:</h2> : null
        }

        <Grid container style={{ padding: 20 }} >

          {
            this.state.people ? this.state.people.people.map(person => {
              return (<Grid item sm={6} key={person.name} ><h3>{person.name}</h3><h3>{person.craft}</h3></Grid>)
            }) : <CircularProgress />
          }

          {
            this.state.data ? console.log(this.state.data) : null
          }

        </Grid>

        <footer>
          <a href="/" style={styles.footerLink} >Home</a>
          <a href="/asteroids" style={styles.footerLink} >Asteroids</a>
          <a href="/photos" style={styles.footerLink} >Photos</a>
          <a href="/iss" style={styles.footerLink} >Space Station</a>
        </footer>

      </div>
    );
  }
}

export default ISS;
