import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


const API_URL = 'https://api.nasa.gov/planetary/apod?api_key=JsG393zPVDFLqXc7ZbnKHH6DYwpCi0OjFlWBsi81'


const styles = {
    descr: { padding: 35, margin: 20, fontSize: 20, color: 'white' },
    title: { color: 'white', fontSize: 40 },
    loader: { margin: 30 },
    img: { borderRadius: 20, boxShadow: '0px 4px solid white' }
}

class Test extends Component {

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
                        <img src={this.state.data.hdurl}
                            width='80%'
                            alt={this.state.data.title}
                            style={styles.img}
                        />
                        <p style={styles.descr} >{this.state.data.explanation}</p>
                    </div> : <CircularProgress style={styles.loader} color='inherit' />
                }
            </div>
        );
    }
}

export default Test;
