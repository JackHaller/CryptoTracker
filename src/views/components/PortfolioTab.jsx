import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import { getCurrentPriceData, getCurrentCoins, getFullDailyHistory, getDailyHistory } from 'databaseUtil.js';

import Highcharts from "highcharts/highcharts"
import Stockcharts from "highcharts/highstock"
import $ from 'jquery'


//settings menu should move this to seperate component
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";


/*
TODO: all coins graph doesnt load on load probably because it doesnt wait for state to set before trying to build graph and getting data is async
TODO
*/


class PortfolioTab extends React.Component {
  state = {
    value: 0,
    coins: ["all coins", "BTC", "ETH"],
    dayCoinData: [],
    hourCoinData: null,
    minuteCoinData: null,
    coinPosition: { "BTC": 0.1, "ETH": 2 }
  };


  getAllData = (coinPosition) => {
    var test = Object.keys(coinPosition)

    var testarr = {}
    for (let key in test) {
      getFullDailyHistory(test[key])
        .then((dataSnapshot) => {
          var data = dataSnapshot.val()
          var timeAndPrice = []
          for (let x in data) {
            timeAndPrice.push([data[x].time * 1000, data[x].high * coinPosition[test[key]]])
          }
          testarr[test[key]] = timeAndPrice
        })
    }
    this.setState({ dayCoinData: testarr });
    this.testGraph("all coins")
  }

  testGraph = (coin) => {
    // this is dumb and slow needs doing properly
    // if anyone reads this im a moron 
    // note: doesnt handle going before ICO properly maybe i need to update graph to show that
    console.log(coin)
    if (coin == "all coins") {
      var test1 = {}
      for (let x in this.state.dayCoinData) {
        for (let j in this.state.dayCoinData[x]) {
          if (test1[this.state.dayCoinData[x][j][0]]) {
            test1[this.state.dayCoinData[x][j][0]] += this.state.dayCoinData[x][j][1]
          }
          else {
            test1[this.state.dayCoinData[x][j][0]] = this.state.dayCoinData[x][j][1]
          }
        }
      }

      var test2 = []

      for (let x in test1) {
        test2.push([parseInt(x), test1[x]])
      }
      Stockcharts.stockChart('test', {

        chart: {
          height: 400
        },

        title: {
          text: 'Total Portfolio Value'
        },

        rangeSelector: {
          selected: 1
        },

        series: [{
          name: 'Total Portfolio Value',
          data: test2,
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
    }
    else {
      var timeAndPrice = this.state.dayCoinData[coin]

      Stockcharts.stockChart('test', {

        chart: {
          height: 400
        },

        title: {
          text: coin + ' Component Of Portfolio Value'
        },

        rangeSelector: {
          selected: 1
        },

        series: [{
          name: coin + ' Value',
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
    }
  }

  createDayDataLineGraph = (coin) => {
    getFullDailyHistory(coin)
      .then((dataSnapshot) => {
        var data = dataSnapshot.val()
        var timeAndPrice = []
        for (let x in data) {
          timeAndPrice.push([data[x].time * 1000, data[x].high])
        }
        try {

          Stockcharts.stockChart('test', {

            chart: {
              height: 400
            },

            title: {
              text: coin + 'Component Of Portfolio Value'
            },

            rangeSelector: {
              selected: 1
            },

            series: [{
              name: coin + ' Value',
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
        }
        catch (err) {
          console.log(err);
        }

      });
  }

  handleChange = (event, value) => {
    this.setState({ value: value });
    this.testGraph(this.state.coins[value])
  }

  componentDidMount() {
    this.getAllData(this.state.coinPosition)

  }
  //todo make the graph a basic line graph copy robinhood layout
  render() {
    const { classes } = this.props;
    const value = this.state.value;
    const coins = this.state.coins
    const tabTitles = coins.map((coinSymbol) =>
      <Tab key={coinSymbol.toString()} label={coinSymbol.toString()}></Tab>
    )

    return (
      <div className={classes.root}>


        <Card>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              {tabTitles}
            </Tabs>
          </AppBar>
          <Typography component="div" style={{ padding: 8 * 3 }}>
            <div id="test">
            </div>
          </Typography>
        </Card>

      </div>

    );
  }
}

PortfolioTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles()(PortfolioTab);