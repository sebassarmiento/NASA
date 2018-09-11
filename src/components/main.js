import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


const API_URL = 'https://api.nasa.gov/planetary/apod?api_key=JsG393zPVDFLqXc7ZbnKHH6DYwpCi0OjFlWBsi81'


const styles = {
    descr: { padding: 35, margin: 20, fontSize: 20, color: 'white' },
    title: { color: 'white', fontSize: 40 },
    loader: { margin: 30 },
    img: { borderRadius: 20, boxShadow: '0px 4px solid white' },
    footerLink: { textDecoration: 'none', color: '#f5f5f5', margin: 30, padding: 20, marginTop:50 }
}

class Home extends Component {

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
            <div >

                {
                    this.state.data ? console.log(this.state.data) : null
                }

                {
                    this.state.data ? <div>
                        <h1 style={styles.title} >{this.state.data.title}</h1>
                        <h4>{this.state.data.date}</h4>
                        {
                            this.state.data.media_type === 'image' ? <img src={this.state.data.hdurl}
                                width='80%'
                                alt={this.state.data.title}
                                style={styles.img}
                            /> : this.state.data.media_type === 'video' ? <iframe width="80%" height="500" src={this.state.data.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe> : null
                        }

                        <p style={styles.descr} >{this.state.data.explanation}</p>
                    </div> : <CircularProgress style={styles.loader} color='inherit' />
                }

                {
                    this.state.data ? <footer style={{ margin: 20, padding: 20 }} >
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

export default Home;
