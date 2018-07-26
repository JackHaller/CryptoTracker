/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { AccountBox, AttachMoney ,FavoriteBorder , AccountBalanceWallet} from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to="/" className={classes.dropdownLink}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <AttachMoney className={classes.icons} /> Price
          </Button>
        </Link>
      </ListItem>
      
      <ListItem className={classes.listItem}>
        <Link to="/favorites-page" className={classes.dropdownLink}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <FavoriteBorder className={classes.icons} /> favorites
          </Button>
        </Link>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Link to="/portfolio-page" className={classes.dropdownLink}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <AccountBalanceWallet className={classes.icons} /> Portfolio
          </Button>
        </Link>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Link to="/login-page" className={classes.dropdownLink}>
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <AccountBox className={classes.icons} /> Login
          </Button>
        </Link>
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
