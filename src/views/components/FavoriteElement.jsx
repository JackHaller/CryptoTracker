import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { getCurrentPriceData, getCurrentCoins, getFullDailyHistory, getDailyHistory } from 'databaseUtil.js';
import Highcharts from "highcharts/highcharts"
import Stockcharts from "highcharts/highstock"

import Card from "components/Card/Card.jsx";
import { Typography } from '@material-ui/core';


class PortfolioTab extends React.Component {
  state = {
    value: 0,
    coins: ["BTC", "ETH", "XRP"],
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


  createDayDataLineGraph = (coin) => {
    getFullDailyHistory(coin)
      .then((dataSnapshot) => {
        var data = dataSnapshot.val()
        var timeAndPrice = []
        for (let x in data) {
          timeAndPrice.push([data[x].time * 1000, data[x].high])
        }

        try {
          Stockcharts.stockChart(coin, {

            chart: {
              height: 400
            },

            title: {
              text: coin + ' Price'
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
        }
        catch (err) {
          console.log(err);
        }

      });
  }

  handleChange = (event, value) => {
    //this.setState({ value: value });
  }

  componentDidMount() {

  }

  render() {
    const { classes } = this.props;
    const value = this.state.value;
    const coins = this.state.coins
    const tabTitles = coins.map((coinSymbol) =>
      <Card id={coinSymbol.toString()} style={{ padding: 24 * 3 }} key={coinSymbol.toString()} label={coinSymbol.toString()}>
        Loading
        {this.createDayDataLineGraph(coinSymbol.toString())}
      </Card>
    )

    return (
      <div className={classes.root}>
        <Typography>
          <h1> Havent really decided what to do with this page might delete it</h1>
        </Typography>
        {tabTitles}

      </div>

    );
  }
}

PortfolioTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles()(PortfolioTab);