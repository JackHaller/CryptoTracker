import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import { AccountBox, AttachMoney, FavoriteBorder, AccountBalanceWallet } from "@material-ui/icons";

import firebase from "firebase";

import menuAppBarStyle from "assets/jss/custom/components/MenuAppBarStyle.jsx";




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
            console.log("logout")
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
                        color="default"
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
                    <Link to="/login-page" className={classes.menuButton}>
                        <Button
                            color='default'
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
        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} >
                    <Toolbar className={classes.toolBar} >
                        <Typography variant="title" color='inherit' className={classes.flex}>
                            CryptoTracker
                        </Typography>

                        <Link to="/" className={classes.menuButton}>
                            <Button
                                size='large'
                                target="_blank"
                                className={classes.navLink}
                            >
                                <AttachMoney className={classes.icons} /> Price
                            </Button>
                        </Link>

                        <Link to="/favorites-page" className={classes.menuButton}>
                            <Button
                                color='default'
                                size='large'
                                target="_blank"
                                className={classes.navLink}
                            >
                                <FavoriteBorder className={classes.icons} /> favorites
                            </Button>
                        </Link>

                        <Link to="/portfolio-page" className={classes.menuButton}>
                            <Button
                                color='default'
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
