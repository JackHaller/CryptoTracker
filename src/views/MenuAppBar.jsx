import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import { AccountBox, AttachMoney, FavoriteBorder, AccountBalanceWallet } from "@material-ui/icons";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import firebase from "firebase";
import firebaseapp from "../firebase.js"


import menuAppBarStyle from "assets/jss/custom/components/MenuAppBarStyle.jsx";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class MenuAppBar extends React.Component {
    state = {
        user: null,
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    logOut = () => {
        firebase.auth().signOut().then(function () {
            console.log("signed out")
        }).catch(function (error) {
            console.log("error")
        });
    };


    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                user,
            });
        });
    }
    componentWillUnmount() {
        this.authSubscription();
    }

    isLoggedIn = () => {

        const { classes } = this.props;
        const { user, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        if (user) {
            return (
                <div>
                    <IconButton
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.logOut}>Log Out</MenuItem>
                        <MenuItem onClick={this.handleClose}>Account Settings</MenuItem>
                    </Menu>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Link to="/login-page" style={{ color: 'white' }}>
                        <Button
                            color='inherit'
                            size='large'
                            target="_blank"
                            className={classes.navLink}
                        >
                            <AccountBox className={classes.icons} /> Login
                        </Button>
                    </Link>
                </div>
            )
        }
    };

    render() {
        const { classes } = this.props;
        const { user, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        console.log(this.state)
        return (
            <div className={classes.root}>
                <AppBar position='fixed'>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            CryptoTracker
                        </Typography>

                        <Link to="/" style={{ color: 'white' }}>
                            <Button
                                color='inherit'
                                size='large'
                                target="_blank"
                                className={classes.navLink}
                            >
                                <AttachMoney className={classes.icons} /> Price
                            </Button>
                        </Link>

                        <Link to="/favorites-page" style={{ color: 'white' }}>
                            <Button
                                color='inherit'
                                size='large'
                                target="_blank"
                                className={classes.navLink}
                            >
                                <FavoriteBorder className={classes.icons} /> favorites
                            </Button>
                        </Link>

                        <Link to="/portfolio-page" style={{ color: 'white' }}>
                            <Button
                                color='inherit'
                                size='large'
                                target="_blank"
                                className={classes.navLink}
                            >
                                <AccountBalanceWallet className={classes.icons} /> Portfolio
                            </Button>
                        </Link>
                        {this.isLoggedIn()}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}



MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(menuAppBarStyle)(MenuAppBar);
