import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import favoritesPageStyle from "assets/jss/material-kit-react/views/favoritesPageStyle.jsx";


import MenuAppBar from "../MenuAppBar.jsx" ;
const dashboardRoutes = [];

class FovoritesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <MenuAppBar/>
        <div
          className={classes.pageHeader}
          style={{
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem md={12}>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(favoritesPageStyle)(FovoritesPage);