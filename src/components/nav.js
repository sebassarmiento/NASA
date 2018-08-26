import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../img/nasa-logo.png';
import IconButton from '@material-ui/core/IconButton';


const styles = {
    navBarText: {textDecoration: 'none', fontSize: 60, margin: 10},
    appBar: {backgroundColor: 'black'}
};


class NavBar extends Component {

    render() {
        return (
            <div className="App">
                    <AppBar position="static" style={styles.appBar} >
                        <Toolbar>

                            <IconButton>
                                <img src={Logo} height='40px' alt="Nasa logo" />
                            </IconButton>

                            <NavLink to="/" style={styles.navBarText} >
                                <Typography style={{color: 'white'}} >Home</Typography>
                            </NavLink>


                            <NavLink to="/about" style={styles.navBarText} >
                                <Typography style={{color: 'white'}} >Asteroids</Typography>
                            </NavLink>


                            <NavLink to="/contact" style={styles.navBarText} >
                                <Typography style={{color: 'white'}} >Contact</Typography>
                            </NavLink>


                            <NavLink to="/jobs" style={styles.navBarText} >
                                <Typography style={{color: 'white'}} >Jobs</Typography>
                            </NavLink>

                        </Toolbar>
                    </AppBar>
            </div>
        );
    }
}

export default NavBar;
