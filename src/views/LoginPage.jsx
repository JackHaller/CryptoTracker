import React from "react";
import classNames from 'classnames';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
import People from "@material-ui/icons/People";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPageStyle.jsx";

import MenuAppBar from "./components/MenuAppBar.jsx";

import firebase from "firebase";
import firebaseapp from "firebase.js"

import withRoot from 'withRoot';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      inputEmail: '',
      inputName: '',
      inputPassword: '',
      showPassword: false,
    };
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  signInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    authObject.signInWithPopup(provider);
  }
  signInWithFacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    authObject.signInWithPopup(provider);
  }

  signInWithEmail = (email, password) => {
    authObject.createUserWithEmailAndPassword(
      email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        return
      }).then((auth) => console.log(auth))
      //try set a state for loggin to swap pages?
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <MenuAppBar />
        <div
          className={classes.pageHeader}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          target="_blank"
                          color="transparent"
                          onClick={this.signInWithFacebook}
                        >
                          <i className={"fab fa-facebook"} />
                        </Button>
                        <Button
                          justIcon
                          target="_blank"
                          color="transparent"
                          onClick={this.signInWithGoogle}
                        >
                          <i className={"fab fa-google-plus-g"} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody>
                    <FormControl className={classNames(classes.margin, classes.textField)} fullWidth={true}>
                        <InputLabel htmlFor="adornment-name">Name</InputLabel>
                        <Input
                          id="adornment-name"
                          value={this.state.inputName}
                          onChange={this.handleChange('inputName')}
                          endAdornment={
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <FormControl className={classNames(classes.margin, classes.textField)} fullWidth={true}>
                        <InputLabel htmlFor="adornment-email">Email</InputLabel>
                        <Input
                          id="adornment-email"
                          value={this.state.inputEmail}
                          onChange={this.handleChange('inputEmail')}
                          endAdornment={
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          }
                        />
                      </FormControl>

                      <FormControl className={classNames(classes.margin, classes.textField)} fullWidth={true}>
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input
                          id="adornment-password"
                          type={this.state.showPassword ? 'text' : 'password'}
                          value={this.state.password}
                          onChange={this.handleChange('inputPassword')}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}
                              >
                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button color="primary" size="lg" onClick={() => {this.signInWithEmail(this.state.inputEmail, this.state.inputPassword)}}>
                        Get started
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}


var authObject = firebase.auth()


export default withRoot(withStyles(loginPageStyle)(LoginPage));
