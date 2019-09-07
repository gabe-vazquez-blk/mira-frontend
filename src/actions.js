import { 
  CURRENTUSER,
  STOCKS,
  WATCHLIST,
  FILTER,
  SEARCHRESULT,
  CURRENTSTOCK,
  SHOWSTOCK,
  NEWS
 } from './types'

function setCurrentUser(currentUser){
  return {type: CURRENTUSER, payload: currentUser}
}

function setStocks(stocks){
  return {type: STOCKS, payload: stocks}
}

function setWatchlist(watchlist){
  return {type: WATCHLIST, payload: watchlist}
}

function setFilter(list){
  return {type: FILTER, payload: list}
}

function setsearchresult(result){
  return { type: SEARCHRESULT, payload: result }
}

function setCurrentStock(stock){
  return {type: CURRENTSTOCK, payload: stock}
}

function setShowStock(stock){
  return {type: SHOWSTOCK, payload: stock}
}

// <---- FETCHES ---->
function autoLogin(){
  return function(dispatch){
    const token = localStorage.token
    if (token) {
      return fetch(`${process.env.REACT_APP_BACKEND}/auto_login`, {
        headers: {
          'Authorization': token
        }
      })
        .then(resp => resp.json())
        .then(user => {
          if (user.errors) {
            alert(user.errors)
          } else {
            dispatch(setCurrentUser(user))
            dispatch(setWatchlist(user.stocks))
            dispatch(getNews(user.stocks))
          }
        })
      }
    }
  }

  function getWatchlist(currentUser){
    return function(dispatch){
      let newWatchlist = []
      fetch(`${process.env.REACT_APP_BACKEND}/users/${currentUser.id}`)
        .then(resp => resp.json())
        .then(user => {
          dispatch(setWatchlist(user.stocks))
          newWatchlist = user.stocks
        })
        .then(() => dispatch(getNews(newWatchlist)))
    }
  }

  function getNews(watchlist){
    return function(dispatch){
      const promiseArray = watchlist.map(stock => {
        return fetch(`${process.env.REACT_APP_TEST_API_URL}/stock/${stock.ticker}/news?token=${process.env.REACT_APP_TEST_API_KEY}`)
        .then(resp => resp.json())
      })

      Promise.all(promiseArray)
      .then(responses => {
        const response = responses.flat()

        dispatch({ type: NEWS, payload: response })
      })
    }
  }

function removeFromWatchList(stockId) {
  return function(dispatch){
    console.log('REMOVING...')
    fetch(`${process.env.REACT_APP_BACKEND}/remove_from_watchlist/${stockId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": localStorage.token,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    })
      .then(resp => resp.json())
      .then(watchlist => dispatch(setWatchlist(watchlist)))
  }
}

  // function template(argsFromComponent){
  //   return function(dispatch){
  
  //   }
  // }

export {
  setStocks,
  setCurrentUser,
  setWatchlist,
  setFilter,
  setsearchresult,
  setCurrentStock,
  setShowStock,
  autoLogin,
  getWatchlist,
  getNews,
  removeFromWatchList
}