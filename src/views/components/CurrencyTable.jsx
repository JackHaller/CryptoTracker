import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import withRoot from 'withRoot';

import ReactTable from "react-table";
import "react-table/react-table.css";
import currencyTableStyle from "assets/jss/material-kit-react/views/currencyTableStyle.jsx";

import { getCurrentPriceData, getCurrentCoins, getFullDailyHistory, getDailyHistory } from 'databaseUtil.js';
import Chart from './testChart';
import { TypeChooser } from "react-stockcharts/lib/helper";

import Highcharts from "highcharts/highcharts"
import Stockcharts from "highcharts/highstock"



class CurrenyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoinData: [],
      coinNames: [],
      expanded: null,
    };
  }

  updateCurrencyData = () => {
    getCurrentPriceData()
      .then((dataSnapshot) => {
        let coinData = dataSnapshot.val()
        let currencyList = []
        for (let x in coinData) {
          coinData[x].raw.MKTCAP = "$ " + coinData[x].raw.MKTCAP.formatMoney(0, '.', ',')
          coinData[x].raw.TOTALVOLUME24HTO = "$ " + coinData[x].raw.TOTALVOLUME24HTO.formatMoney(0, '.', ',')
          coinData[x].raw.CHANGEPCT24HOUR = coinData[x].raw.CHANGEPCT24HOUR.formatMoney(2, '.', ',') + " %"
          currencyList.push(coinData[x])
        }
        this.setState({
          currentCoinData: currencyList
        });
      });
  }

  createStockGraph = (coin) => {
    getFullDailyHistory(coin)
      .then((dataSnapshot) => {
        let data = dataSnapshot.val()
        console.log(data)
        let test2 = []
        let test3 = []
        for (let x in data) {
          test2.push([data[x].time * 1000, data[x].open, data[x].high, data[x].low, data[x].close])
          test3.push([data[x].time * 1000, data[x].volumeto])
        }

        let
          groupingUnits = [[
            'week',             // unit name
            [1]               // allowed multiples
          ], [
            'month',
            [1, 2, 3, 4, 6]
          ]]

        let volume = test3
        let ohlc = test2

        Stockcharts.stockChart(coin, {

          rangeSelector: {
            selected: 1
          },

          title: {
            text: 'BTC Historical Values'
          },

          yAxis: [{
            labels: {
              align: 'right',
              x: -3
            },
            title: {
              text: 'OHLC'
            },
            height: '65%',
            lineWidth: 2,
            resize: {
              enabled: true
            }
          }, {
            labels: {
              align: 'right',
              x: -5
            },
            title: {
              text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
          }],

          tooltip: {
            split: true
          },

          series: [{
            type: 'candlestick',
            name: 'BTC',
            data: ohlc,
            dataGrouping: {
              units: groupingUnits
            }
          }, {
            type: 'column',
            name: 'Volume',
            data: volume,
            yAxis: 1,
            dataGrouping: {
              units: groupingUnits
            }
          }]
        });
      });

  }
  createDayDataLineGraph = (coin) => {
    getFullDailyHistory(coin)
      .then((dataSnapshot) => {
        var data = dataSnapshot.val()
        var timeAndPrice =[]
        for (let x in data) {
          timeAndPrice.push([data[x].time * 1000,data[x].high])
        }

        Stockcharts.stockChart(coin, {

          chart: {
              height: 400
          },
    
          title: {
              text: coin + ' Price Graph'
          },
    
          rangeSelector: {
              selected: 1
          },
    
          series: [{
              name: coin + ' Price',
              data: timeAndPrice,
              type: 'line',
              threshold: null,
              tooltip: {
                  valueDecimals: 2
              }
          }],
    
          responsive: {
              rules: [{
                  condition: {
                      maxWidth: 500
                  },
                  chartOptions: {
                      chart: {
                          height: 300
                      },
                      subtitle: {
                          text: null
                      },
                      navigator: {
                          enabled: false
                      }
                  }
              }]
          }
      });
      
      });
  }

  componentDidMount() {
    this.updateCurrencyData()

  }
  componentWillUnmount() {

  }


  render() {
    const coinData = this.state.currentCoinData
    return (
      <div>
        <ReactTable
          data={coinData}
          columns={columns}
          onExpandedChange={(newExpanded, index, event) => {
            /*
            this.setState({
              expanded: newExpanded
            })
            */
          }}

          defaultPageSize={20}
          showPagination={true}

          className="-highlight"
          defaultSorted={[
            {
              id: "raw.MKTCAP",
              desc: true
            }
          ]}
          SubComponent={row => {
            console.log(row.original.raw.FROMSYMBOL)
            { this.createDayDataLineGraph(row.original.raw.FROMSYMBOL) }
            return <div id={row.original.raw.FROMSYMBOL}>Loading...</div>
          }}
        />
      </div>
    );
  }
}
const columns = [
  {
    Header: "Currency",
    accessor: "name"
  },
  {
    Header: "Price",
    accessor: "display.PRICE",
    sortMethod: (a, b) => {
      var a = Number(a.replace(/[^0-9\.-]+/g, ""));
      var b = Number(b.replace(/[^0-9\.-]+/g, ""));
      return a > b ? 1 : -1;
    },
  },
  {
    ofText: 'of',
    Header: "Market Cap",
    accessor: "raw.MKTCAP",
    sortMethod: (a, b) => {
      var a = Number(a.replace(/[^0-9\.-]+/g, ""));
      var b = Number(b.replace(/[^0-9\.-]+/g, ""));
      return a > b ? 1 : -1;
    },
  },
  {
    Header: "Volume 24h",
    accessor: "raw.TOTALVOLUME24HTO",
    sortMethod: (a, b) => {
      var a = Number(a.replace(/[^0-9\.-]+/g, ""));
      var b = Number(b.replace(/[^0-9\.-]+/g, ""));
      return a > b ? 1 : -1;
    },
  },
  {
    Header: "Change 24h",
    accessor: "raw.CHANGEPCT24HOUR",
    sortMethod: (a, b) => {
      var a = Number(a.replace(/[^0-9\.-]+/g, ""));
      var b = Number(b.replace(/[^0-9\.-]+/g, ""));
      return a > b ? 1 : -1;
    },
  },
  {
    Header: "Price High 24h",
    accessor: "display.HIGH24HOUR",
    sortMethod: (a, b) => {
      var a = Number(a.replace(/[^0-9\.-]+/g, ""));
      var b = Number(b.replace(/[^0-9\.-]+/g, ""));
      return a > b ? 1 : -1;
    },
  },
  {
    Header: "Price Low 24h",
    accessor: "display.LOW24HOUR",
    sortMethod: (a, b) => {
      var a = Number(a.replace(/[^0-9\.-]+/g, ""));
      var b = Number(b.replace(/[^0-9\.-]+/g, ""));
      return a > b ? 1 : -1;
    },
  },
]

Number.prototype.formatMoney = function (c, d, t) {
  var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

export default withRoot(withStyles(currencyTableStyle)(CurrenyTable));

