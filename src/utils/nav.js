import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../img/nasa-logo.png';
import IconButton from '@material-ui/core/IconButton';


const styles = {
    navBarText: { textDecoration: 'none', fontSize: 60, margin: 10 },
    appBar: { backgroundColor: 'transparent' },
    navBarLink: { color: '#f5f5f5b0', fontSize: 16, fontFamily: '"nasalization-rg", monospace' },
    navHover: { color: 'white', fontSize: 16, fontFamily: '"nasalization-rg", monospace', textShadow: '1px 1px 4px white, 0 0 25px white, 0 0 5px white' }
};


class NavBar extends Component {
    constructor() {
        super()
        this.state = {
            home: false,
            asteroids: false,
            photos: false,
            space_station: false,
        }
    }

    changeClass(val, bool) {
        val === 'home' ? this.setState({ home: bool }) : null
        val === 'asteroids' ? this.setState({ asteroids: bool }) : null
        val === 'photos' ? this.setState({ photos: bool }) : null
        val === 'space_station' ? this.setState({ space_station: bool }) : null
    }


    render() {
        return (
            <div className="App">
                <AppBar position="static" style={styles.appBar} >
                    <Toolbar>

                        <IconButton>
                            <img src={Logo} height='40px' alt="Nasa logo" />
                        </IconButton>

                        <NavLink to="/" style={styles.navBarText} >
                            {
                                this.state.home ? <Typography style={styles.navHover} onMouseLeave={() => this.changeClass('home', false)} >HOME</Typography> : <Typography style={styles.navBarLink} onMouseEnter={() => this.changeClass('home', true)} >HOME</Typography>
                            }
                        </NavLink>


                        <NavLink to="/asteroids" style={styles.navBarText} >
                            {
                                this.state.asteroids ? <Typography style={styles.navHover} onMouseLeave={() => this.changeClass('asteroids', false)} >ASTEROIDS</Typography> : <Typography style={styles.navBarLink} onMouseEnter={() => this.changeClass('asteroids', true)} >ASTEROIDS</Typography>
                            }
                        </NavLink>


                        <NavLink to="/photos" style={styles.navBarText} >
                            {
                                this.state.photos ? <Typography style={styles.navHover} onMouseLeave={() => this.changeClass('photos',false)} >PHOTOS</Typography> : <Typography style={styles.navBarLink} onMouseEnter={() => this.changeClass('photos', true)} >PHOTOS</Typography>
                            }
                        </NavLink>


                        <NavLink to="/iss" style={styles.navBarText} >
                            {
                                this.state.space_station ? <Typography style={styles.navHover} onMouseLeave={() => this.changeClass('space_station',false)} >SPACE STATION</Typography> : <Typography style={styles.navBarLink} onMouseEnter={() => this.changeClass('space_station', true)} >SPACE STATION</Typography>
                            }
                        </NavLink>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default NavBar;
