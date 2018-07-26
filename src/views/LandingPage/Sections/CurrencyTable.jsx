import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import classNames from "classnames";
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
//import CustomInput from "components/CustomInput/CustomInput.jsx";
//import Button from "components/CustomButtons/Button.jsx";



import ReactTable from "react-table";
import "react-table/react-table.css";

import currencyTableStyle from "assets/jss/material-kit-react/views/currencyTableStyle.jsx";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";




class CurrenyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch('https://api.coinmarketcap.com/v2/ticker/?structure=array')
      .then((response) => {
        var responseData = response.json();
        if (response.status == 200) {
          return responseData
            .then((data) => {

              var s = data.data
              for (var x in s) {
                s[x].quotes.USD.price = "$" + s[x].quotes.USD.price.toLocaleString()
                s[x].quotes.USD.market_cap = "$" + s[x].quotes.USD.market_cap.toLocaleString()
                s[x].quotes.USD.volume_24h = "$" + s[x].quotes.USD.volume_24h.toLocaleString()
                s[x].quotes.USD.percent_change_1h = s[x].quotes.USD.percent_change_1h + '%'
                s[x].quotes.USD.percent_change_24h = s[x].quotes.USD.percent_change_24h + '%'
                s[x].quotes.USD.percent_change_7d = s[x].quotes.USD.percent_change_7d + '%' 
              }
              this.setState({ data: s })
            })
        } else {
          throw new Error('Server Error!');
        }
      })
  }

  render() {
    const data = this.state.data;
    return (
      <div>
        <Card className={classNames.textCenter}>
          <CardBody>
            <ReactTable
              data={data}
              columns={[
                {
                  Header: "Currency",
                  accessor: "name"
                },
                {
                  Header: "Price",
                  accessor: "quotes.USD.price"
                },
                {
                  ofText: 'of',
                  Header: "Market Cap",
                  accessor: "quotes.USD.market_cap"
                },
                {
                  Header: "Volume 24h",
                  accessor: "quotes.USD.volume_24h"
                },
                {
                  Header: "change 1h",
                  accessor: "quotes.USD.percent_change_1h"
                },
                {
                  Header: "change 1d",
                  accessor: "quotes.USD.percent_change_24h"
                },
                {
                  Header: "change 7d",
                  accessor: "quotes.USD.percent_change_7d"
                },
              ]}

              defaultPageSize={15}
              className="-striped -highlight"
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withStyles(currencyTableStyle)(CurrenyTable);

