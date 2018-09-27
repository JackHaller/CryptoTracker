import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import landingPageStyle from "assets/jss/material-kit-react/views/landingPageStyle.jsx";
import CurrencyTable from "./components/CurrencyTable.jsx";
import MenuAppBar from "./components/MenuAppBar.jsx" ;

import withRoot from 'withRoot';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.background}>
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

export default withRoot(withStyles(landingPageStyle)(LandingPage));