import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import portfolioPageStyle from "assets/jss/material-kit-react/views/portfolioPageStyle.jsx";

import MenuAppBar from "./components/MenuAppBar.jsx";
import PortfolioTab from "./components/PortfolioTab.jsx";

import ReactTable from "react-table";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CurrencyTable from "./components/CurrencyTable.jsx";

const dashboardRoutes = [];

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinNames: [],
    };
  }

  getUsersCoins = () => {

  }


  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.background}>      
        <MenuAppBar />
        <div
          className={classes.pageHeader}
          style={{
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem md={12}>
                <PortfolioTab/>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(portfolioPageStyle)(PortfolioPage);
