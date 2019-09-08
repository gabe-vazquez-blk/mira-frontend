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

function getNews(watchlist){
  return function(dispatch){
    const promiseArray = watchlist.map(stock => {
      return fetch(`${process.env.REACT_APP_TEST_API_URL}/stock/${stock.ticker}/news?token=${process.env.REACT_APP_TEST_API_KEY}`)
      .then(resp => resp.json())
    })

    Promise.all(promiseArray)
    .then(responses => {
      const response = responses.flat()
      console.log('GETTING NEWS:', response)
      dispatch({ type: NEWS, payload: response })
    })
  }
}

function addToWatchList(stockId, userId, watchlist){
  return function(dispatch){
    console.log('ADDING TO WATCHLIST...')
    fetch(`${process.env.REACT_APP_BACKEND}/add_to_watchlist/${stockId}`, {
      method: 'POST',
      headers: {
        "Authorization": localStorage.token,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        stock_id: stockId
      })
    })
      .then(resp => resp.json())
      .then(stock => { 
        const newWatchlist = [stock, ...watchlist]
        console.log(newWatchlist)
        dispatch(setWatchlist(newWatchlist))
        dispatch(getNews([stock, ...watchlist]))
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
      .then(watchlist => {
        dispatch(setWatchlist(watchlist))
        dispatch(getNews(watchlist))
      })

  }
}


export {
  setStocks,
  setCurrentUser,
  setWatchlist,
  setFilter,
  setsearchresult,
  setCurrentStock,
  setShowStock,
  autoLogin,
  getNews,
  removeFromWatchList,
  addToWatchList
}

// <---- TEMPLATE ---->
// function template(argsFromComponent){
//   return function(dispatch){       
//   }
// }