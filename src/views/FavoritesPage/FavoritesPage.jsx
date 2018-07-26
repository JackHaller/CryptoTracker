import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import favoritesPageStyle from "assets/jss/material-kit-react/views/favoritesPageStyle.jsx";

// Sections for this page

const dashboardRoutes = [];

class FovoritesPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="dark"
          routes={dashboardRoutes}
          brand="Crypto Tracker"
          rightLinks={<HeaderLinks />}
          fixed
          {...rest}
        />
        <div className={classes.container}>
        </div>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(favoritesPageStyle)(FovoritesPage);
