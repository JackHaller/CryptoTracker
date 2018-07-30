import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import ReactTable from "react-table";
import "react-table/react-table.css";

import firebase from "firebase";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import currencyTableStyle from "assets/jss/material-kit-react/views/currencyTableStyle.jsx";


class CurrenyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  updateCurrencyData() {
    writeCurrencyData()
    var firebaseRef = database.ref("Currencies/data/");
    firebaseRef.once('value')
      .then((dataSnapshot) => {
        this.setState({
          data: dataSnapshot.val()
      });
   });
  }

  componentDidMount() {
    var firebaseRef = database.ref("Currencies/data/");
    firebaseRef.once('value')
      .then((dataSnapshot) => {
        this.setState({
          data: dataSnapshot.val()
      });
   });
    this.interval = setInterval(() => this.updateCurrencyData(), 30000);

  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const data = this.state.data;
    //must turn into list for react table :(
    var currencyList = []
    for (var x in data) {
      currencyList.push(data[x])
    }
    for (var x in currencyList) {
      currencyList[x].quotes.USD.price = "$" + currencyList[x].quotes.USD.price
      currencyList[x].quotes.USD.market_cap = "$" + currencyList[x].quotes.USD.market_cap.toLocaleString()
      currencyList[x].quotes.USD.volume_24h = "$" + currencyList[x].quotes.USD.volume_24h.toLocaleString()
      currencyList[x].quotes.USD.percent_change_1h = currencyList[x].quotes.USD.percent_change_1h + '%'
      currencyList[x].quotes.USD.percent_change_24h = currencyList[x].quotes.USD.percent_change_24h + '%'
      currencyList[x].quotes.USD.percent_change_7d = currencyList[x].quotes.USD.percent_change_7d + '%' 
    }
    return (
      <div>
        <Card className={classNames.textCenter}>
          <CardBody>
            <ReactTable
              data={currencyList}
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

              defaultPageSize={100}
              className="-striped -highlight"
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

function writeCurrencyData(){
  fetch('https://api.coinmarketcap.com/v2/ticker/')
  .then((response) => {
    var responseData = response.json();
    if (response.status == 200) {
      return responseData
        .then((data) => {
          database.ref('Currencies/').set({
            data : data.data,
            metadata : data.metadata
          });
        })
    } else {
      throw new Error('Server Error!');
    }
  })
}

var database = firebase.database();

export default withStyles(currencyTableStyle)(CurrenyTable);

