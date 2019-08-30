import React, { Component } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './containers/Home'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'
import { Route, Switch } from 'react-router-dom'
import StockIndex from './containers/StockIndex'
import Watchlist from './containers/Watchlist'
import { connect } from 'react-redux'
import { setCurrentUser, setWatchlist, autoLogin, setStocks } from './actions'
import StockShowPage from './containers/StockShowPage';

class App extends Component {
  
  getStocks = () => {
    const { setStocks } = this.props
    fetch(`${process.env.REACT_APP_BACKEND}/stocks`)
      .then(resp => resp.json())
      .then(stocks => {
        setStocks(stocks)
      })
  }

  componentDidMount(){
    this.props.autoLogin()
    this.getStocks()
  }

  render(){

    return (
      <div>
          <Route component={Navbar} />
        <div className='mainContainer'>
        <Switch>
          <Route path='/watchlist' render={(routerprops) => <Watchlist routerprops={routerprops}/>} />
          <Route path='/signup' render={(routerprops) => <SignUpForm routerprops={routerprops}/>} />
          <Route path='/login' render={(routerprops)=><LoginForm routerprops={routerprops}/>} />
          <Route path={`/stock/:ticker`} render={(routerprops) => <StockShowPage routerprops={routerprops}/>} />
          <Route path='/stocks' render={(routerprops) => <StockIndex routerprops= { routerprops } />} />
          <Route path='/' render={()=><Home />} />
        </Switch>
        </div>
      </div>
    )
    }
  }

function msp(state) {
  return {
    currentUser: state.user.currentUser,
    showStock: state.stocks.showStock,
    watchlist: state.stocks.watchlist
  }
}

export default connect(msp, { 
  setCurrentUser, 
  setWatchlist, 
  autoLogin,
  setStocks
})(App)
