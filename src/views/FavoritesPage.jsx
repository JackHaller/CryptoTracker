import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import favoritesPageStyle from "assets/jss/material-kit-react/views/favoritesPageStyle.jsx";

import MenuAppBar from "./components/MenuAppBar.jsx";
import FavoriteElement from "./components/FavoriteElement.jsx";

import ReactTable from "react-table";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CurrencyTable from "./components/CurrencyTable.jsx";

const dashboardRoutes = [];

class favoritePage extends React.Component {
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
                <FavoriteElement/>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(favoritesPageStyle)(favoritePage);
