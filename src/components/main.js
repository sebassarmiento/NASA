import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


const API_URL = 'https://api.nasa.gov/planetary/apod?api_key=JsG393zPVDFLqXc7ZbnKHH6DYwpCi0OjFlWBsi81'


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
            <div className="App">
                
                {
                    this.state.data ? console.log(this.state.data) : null
                }

                {
                    this.state.data ? <div>
                        <h1>{this.state.data.title}</h1>
                        <h4>{this.state.data.date}</h4>
                        <img src={this.state.data.hdurl}
                            width='80%'
                            alt={this.state.data.title} />
                        <p>{this.state.data.explanation}</p>
                    </div> : <CircularProgress />
                }
            </div>
        );
    }
}

export default Test;
