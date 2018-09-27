import firebase from "firebase";

var database = firebase.database();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function storeAllDailyHistory() {
  getCurrentPriceData()
    .then((dataSnapshot) => {
      var coinSymbols = Object.keys(dataSnapshot.val())
      for (let i in coinSymbols) {
          sleep(i*5000).then(() => {
          fetch('https://min-api.cryptocompare.com/data/histoday?fsym=' + coinSymbols[i] + '&tsym=' + "USD" + '&allData=true')
          .then((response) => {
            console.log(coinSymbols[i])
            let responseData = response.json();
            if (response.status == 200) {
              return responseData 
                .then((data) => {
                  database.ref('HistroicalData/FullDailyData').update({
                    [coinSymbols[i]]: data.Data
                  });
                })
            } else {
              throw new Error('Server Error!');
            }
          })
        });          
      }
    var time = parseInt((new Date().getTime() / 1000).toFixed(0))
    database.ref('/HistroicalData').update({ lastUpdated: time })
    });
}

//storeAllDailyHistory()




function storeFullDailyHistory(fromCurrency, toCurrency) {
  fetch('https://min-api.cryptocompare.com/data/histoday?fsym=' + fromCurrency + '&tsym=' + toCurrency + '&allData=true')
    .then((response) => {
      let responseData = response.json();
      if (response.status == 200) {
        return responseData
          .then((data) => {
            database.ref('HistroicalData/FullDailyData').update({
              [fromCurrency]: data.Data
            });
          })
      } else {
        throw new Error('Server Error!');
      }
    })
}

//storeFullDailyHistory("BTC", "USD")

function updateCurrentCoinData() {
  getCurrentCoins()
    .then((dataSnapshot) => {
      let currentCoins = dataSnapshot.val()
      let coinSymbols = Object.keys(currentCoins)
      let apiRequests = []
      while (coinSymbols.length > 0) {
        var str = ""
        for (var i in coinSymbols) {
          if (str.length < 290) {
            str += coinSymbols[i] + ','
          }
          else {
            break
          }
        }
        apiRequests.push(str)
        if (str.length < 290) {
          break
        }
        coinSymbols = coinSymbols.splice(i)
      }
      let dbRef = database.ref('/CurrentData/Coins')


      for (let i in apiRequests) {
        fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + apiRequests[i] + '&tsyms=' + "USD")
          .then((response) => {
            let responseData = response.json();
            if (response.status == 200) {
              return responseData
                .then((data) => {
                  var symbols = []
                  for (let a in data.RAW) { 
                    //update coin if it meets requirments else delete it from current price list              
                    if (data.RAW[a].USD.MKTCAP > 1000 && data.RAW[a].USD.TOTALVOLUME24HTO > 100 && data.RAW[a].USD.VOLUME24HOURTO > 1){
                        symbols.push(a)
                    }
                    else(dbRef.child(a).remove())
                  }
                  for (let j = 0; j < symbols.length; j++) {
                    let jdata = {name:currentCoins[symbols[j]].CoinName ,raw:data.RAW[symbols[j]].USD,display:data.DISPLAY[symbols[j]].USD}
                    dbRef.update({
                      [symbols[j]]: jdata
                    });
                  }
                })
            } else {
              throw new Error('Server Error!');
            }
          })
      }
      var time = parseInt((new Date().getTime() / 1000).toFixed(0))
      database.ref('/CurrentData').update({ lastUpdated: time })
    });
}

//updateCurrentCoinData()

function getListedCoins() {
  fetch('https://min-api.cryptocompare.com/data/all/coinlist')
    .then((response) => {
      var responseData = response.json();
      if (response.status == 200) {
        return responseData
          .then((data) => {
            console.log(data.Data)
            for (var x in data.Data) {
              if (!data.Data[x].IsTrading) {
                delete data.Data[x]
              }
              else {
                delete data.Data[x].IsTrading
                delete data.Data[x].BuiltOn
                delete data.Data[x].FullName
                delete data.Data[x].Name
                delete data.Data[x].FullyPremined
                delete data.Data[x].Id
                delete data.Data[x].ImageUrl
                delete data.Data[x].PreMinedValue
                delete data.Data[x].SmartContractAddress
                delete data.Data[x].SortOrder
                delete data.Data[x].Symbol
                delete data.Data[x].TotalCoinSupply
                delete data.Data[x].TotalCoinsFreeFloat
                delete data.Data[x].Url
                delete data.Data[x].Sponsored
              }
            }
            var count = Object.keys(data.Data).length;
            var time = parseInt((new Date().getTime() / 1000).toFixed(0))
            database.ref('/TrackedCoins').set({
              Coins: data.Data,
              numCoins: count,
              lastUpdated: time
            });
          })
      } else {
        throw new Error('Server Error!');
      }
    })
}

//getListedCoins()



export function generateUserSettings(){
  var firebaseRef = database.ref("users/uid");
  return firebaseRef.once('value')
}

export function getUserSettings() {
  var firebaseRef = database.ref("users/uid");
  return firebaseRef.once('value')
}
getUserSettings()

export function getCurrentCoins() {
  var firebaseRef = database.ref("TrackedCoins/Coins");
  return firebaseRef.once('value')
}

export function getCurrentPriceData() {
  var firebaseRef = database.ref("CurrentData/Coins");
  return firebaseRef.once('value')
}

export function getFullDailyHistory(coin) {
  var firebaseRef = database.ref("HistroicalData/FullDailyData/" + coin);
  return firebaseRef.once('value')
}

export function getDailyHistory(coinSymbol) {
  fetch('https://min-api.cryptocompare.com/data/histoday?fsym=' + coinSymbol + '&tsym=' + "USD" + '&allData=true')
  .then((response) => {
    let responseData = response.json();
    if (response.status == 200) {
      return responseData.Data
    } else {
      throw new Error('Server Error!');
    }
  })
}
//getDailyHistory("BTC")
//getDailyHistory("ETH")
//getFullDailyHistory("BTC")
