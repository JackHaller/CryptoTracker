import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import portfolioPageStyle from "assets/jss/material-kit-react/views/portfolioPageStyle.jsx";

import MenuAppBar from "../MenuAppBar.jsx" ;
// Sections for this page

const dashboardRoutes = [];

class PortfolioPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <MenuAppBar/>
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

export default withStyles(portfolioPageStyle)(PortfolioPage);
