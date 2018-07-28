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

import firebase from "firebase";

class CurrenyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    writeCurrencyData()
    var firebaseRef = firebase.database().ref("Currencies/data/");
    firebaseRef.once('value')
      .then((dataSnapshot) => {
        this.setState({
          data: dataSnapshot.val()
      });
   });
  }

  render() {
    const data = this.state.data;
    var s = data
    for (var x in s) {
      s[x].quotes.USD.price = "$" + s[x].quotes.USD.price
      s[x].quotes.USD.market_cap = "$" + s[x].quotes.USD.market_cap.toLocaleString()
      s[x].quotes.USD.volume_24h = "$" + s[x].quotes.USD.volume_24h.toLocaleString()
      s[x].quotes.USD.percent_change_1h = s[x].quotes.USD.percent_change_1h + '%'
      s[x].quotes.USD.percent_change_24h = s[x].quotes.USD.percent_change_24h + '%'
      s[x].quotes.USD.percent_change_7d = s[x].quotes.USD.percent_change_7d + '%' 
    }
    return (
      <div>
        <Card className={classNames.textCenter}>
          <CardBody>
            <ReactTable
              data={s}
              columns={[
                {
                  Header: "Currency",
                  accessor: "name"
                },
                {
                  Header: "Price",
                  accessor: "quotes.USD.price",
                  sortMethod: (a, b) => {
                    var a = Number(a.replace(/[^0-9\.-]+/g,""));
                    var b = Number(b.replace(/[^0-9\.-]+/g,""));
                    return a > b ? 1 : -1;
                  }
                },
                {
                  ofText: 'of',
                  Header: "Market Cap",
                  accessor: "quotes.USD.market_cap",
                  sortMethod: (a, b) => {
                    var a = Number(a.replace(/[^0-9\.-]+/g,""));
                    var b = Number(b.replace(/[^0-9\.-]+/g,""));
                    return a > b ? 1 : -1;
                  }
                },
                {
                  Header: "Volume 24h",
                  accessor: "quotes.USD.volume_24h",
                  sortMethod: (a, b) => {
                    var a = Number(a.replace(/[^0-9\.-]+/g,""));
                    var b = Number(b.replace(/[^0-9\.-]+/g,""));
                    return a > b ? 1 : -1;
                  }
                },
                {
                  Header: "change 1h",
                  accessor: "quotes.USD.percent_change_1h",
                  sortMethod: (a, b) => {
                    var a = Number(a.replace(/[^0-9\.-]+/g,""));
                    var b = Number(b.replace(/[^0-9\.-]+/g,""));
                    return a > b ? 1 : -1;
                  }
                },
                {
                  Header: "change 1d",
                  accessor: "quotes.USD.percent_change_24h",
                  sortMethod: (a, b) => {
                    var a = Number(a.replace(/[^0-9\.-]+/g,""));
                    var b = Number(b.replace(/[^0-9\.-]+/g,""));
                    return a > b ? 1 : -1;
                  }
                },
                {
                  Header: "change 7d",
                  accessor: "quotes.USD.percent_change_7d",
                  sortMethod: (a, b) => {
                    var a = Number(a.replace(/[^0-9\.-]+/g,""));
                    var b = Number(b.replace(/[^0-9\.-]+/g,""));
                    return a > b ? 1 : -1;
                  }
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

function writeCurrencyData(){
  fetch('https://api.coinmarketcap.com/v2/ticker/?structure=array')
  .then((response) => {
    var responseData = response.json();
    if (response.status == 200) {
      return responseData
        .then((data) => {
          firebase.database().ref('Currencies/').set({
            data : data.data,
            metadata : data.metadata
          });
        })
    } else {
      throw new Error('Server Error!');
    }
  })
}


var config = {
  apiKey: "AIzaSyApdOt_lT-3SFDsKilN-wb6G2zySxaQ0QY",
  authDomain: "cryptotracker-bcd99.firebaseapp.com",
  databaseURL: "https://cryptotracker-bcd99.firebaseio.com/",
  storageBucket: "gs://cryptotracker-bcd99.appspot.com",
};
//firebase.initializeApp(config);
var database = firebase.database();



export default withStyles(currencyTableStyle)(CurrenyTable);

