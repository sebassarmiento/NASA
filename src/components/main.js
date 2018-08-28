import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


const API_URL = 'https://api.nasa.gov/planetary/apod?api_key=JsG393zPVDFLqXc7ZbnKHH6DYwpCi0OjFlWBsi81'


const styles = {
    descr: { padding: 20, margin: 20, fontSize: 20, color: 'black' },
    title: { color: 'black', fontSize: 40 }
}

class Test extends Component {

    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        console.log('Funciona')
        fetch(API_URL).then(d => d.json()).then(resp => this.setState({
            data: resp
        }))
    }

    render() {

        return (
            <div className="App" >
                
                {
                    this.state.data ? console.log(this.state.data) : null
                }

                {
                    this.state.data ? <div>
                        <h1 style={styles.title} >{this.state.data.title}</h1>
                        <h4>{this.state.data.date}</h4>
                        <img src={this.state.data.hdurl}
                            width='80%'
                            alt={this.state.data.title} />
                        <p style={styles.descr} >{this.state.data.explanation}</p>
                    </div> : <CircularProgress />
                }
            </div>
        );
    }
}

export default Test;
