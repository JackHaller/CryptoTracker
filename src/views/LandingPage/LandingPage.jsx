import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPageStyle.jsx";
import CurrencyTable from "./Sections/CurrencyTable.jsx";
import MenuAppBar from "../MenuAppBar.jsx" ;


const dashboardRoutes = [];

class LandingPage extends React.Component {
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
                <CurrencyTable />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);