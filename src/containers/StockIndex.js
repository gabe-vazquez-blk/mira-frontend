import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import StockFilterBar from '../components/StockFilterBar'
import Stock from '../components/Stock'
import { Grid } from 'semantic-ui-react'
import { setStocks } from '../actions'

class StockIndex extends Component {

  state = {
    index: 20
  }


  getStocks = ()=>{
    const { setStocks } = this.props
    fetch(`${process.env.REACT_APP_BACKEND}/stocks`)
      .then(resp => resp.json())
      .then(stocks => {
        setStocks(stocks)
      })
  }

  componentDidMount = ()=>{
    this.getStocks()
    this.scrollListener = window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll)
  }

  createStockCards = (stocks)=>{
    return stocks.map(stock => <Stock key={stock.id} stock={stock} routerprops={this.props.routerprops}/>)
  }

  renderStocks = ()=>{
    const { filter, searchresult, stocks } = this.props
    let stockList = [...stocks].filter(stock => stock.ticker.toLowerCase().includes(searchresult.toLowerCase()))

    switch(filter){
      case 'e-up':
        stockList.sort((a, b) => a.e_score - b.e_score)
        return this.createStockCards(stockList)
      case 'e-down':
        stockList.sort((a, b) => b.e_score - a.e_score)
        return this.createStockCards(stockList)
      case 's-up':
        stockList.sort((a, b) => a.s_score - b.s_score)
        return this.createStockCards(stockList)
      case 's-down':
        stockList.sort((a, b) => b.s_score - a.s_score)
        return this.createStockCards(stockList)
      case 'g-up':
        stockList.sort((a, b) => a.g_score - b.g_score)
        return this.createStockCards(stockList)
      case 'g-down':
        stockList.sort((a, b) => b.g_score - a.g_score)
        return this.createStockCards(stockList)
      case 'total-up':
        stockList.sort((a, b) => a.total_score - b.total_score)
        return this.createStockCards(stockList)
      case 'total-down':
        stockList.sort((a, b) => b.total_score - a.total_score)
        return this.createStockCards(stockList)
      default:
        return this.createStockCards(stockList)
    }
  }

  handleScroll = () => {
    const lastLi = document.querySelector("div.stocksWrapper > div:last-child")
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
    const pageOffset = window.pageYOffset + window.innerHeight
    if (pageOffset > lastLiOffset) {
      console.log("SCROLLING")
      this.incrementIndex()
    }
  }

  incrementIndex = ()=>{
    this.setState({index: this.state.index += 10})
  }


  render() {
    return (
      <Route exact path="/stocks" render={() => { 
    
        return (
          <div>
            <Grid columns={2}>
              <Grid.Column width={1}>
                <StockFilterBar />
              </Grid.Column>
              <Grid centered columns={1}>
                <Grid.Column width={11} className='stocksWrapper'>
                  {this.renderStocks().slice(0, this.state.index)}
                </Grid.Column>
              </Grid>
            </Grid>
          </div>
        )
      }} />
    )
  }

}

function msp(state) {
  return {
    stocks: state.stocks.stocks,
    filter: state.stocks.filter,
    searchresult: state.stocks.searchresult,
    watchlist: state.stocks.watchlist
  }
}

export default connect(msp, { setStocks })(StockIndex)