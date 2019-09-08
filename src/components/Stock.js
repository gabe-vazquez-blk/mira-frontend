import React, { Component } from 'react'
import { Segment, Grid, Divider, Icon, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setWatchlist, getNews, removeFromWatchList } from '../actions'

class Stock extends Component {

  state = {
    ticker: this.props.stock.ticker,
    changePercent: 0,
    companyName: '',
    latestPrice: 0,
    watching: false
  }

  getStockInfo = ()=>{
    const { ticker } = this.state
    fetch(`${process.env.REACT_APP_TEST_API_URL}/stock/${ticker}/quote?token=${process.env.REACT_APP_TEST_API_KEY}`)
      .then(resp => resp.json())
      .then(stock => {
        this.setState({
          changePercent: stock.changePercent,
          companyName: stock.companyName,
          latestPrice: stock.latestPrice
        })
      })
  }
  
  addToWatchList = ()=>{
    fetch(`${process.env.REACT_APP_BACKEND}/add_to_watchlist/${this.props.stock.id}`, {
      method: 'POST',
      headers: { 
        "Authorization": localStorage.token,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id:  this.props.currentUser.id,
        stock_id: this.props.stock.id
      })
    })
    .then(resp => resp.json())
    .then(stock => {this.props.setWatchlist([stock,...this.props.watchlist])})
    .then(() => this.setState({watching: true}))
    .then(() => this.props.getNews(this.props.watchlist))
  }
  

  watchingMarkers =()=>{
    const { watchlist, stock } = this.props
    const watchlistTickers = watchlist.map(stock => stock.ticker)
    if (watchlistTickers.includes(stock.ticker)){
      this.setState({ 
        watching: true 
      })
    }
  }
  
  handleWatchingMarkers =()=>{
    const { watchlist, stock, removeFromWatchList } = this.props
    const watchlistTickers = watchlist.map(stock => stock.ticker)
    if (watchlistTickers.includes(stock.ticker)) {
      removeFromWatchList(stock.id)
    } else{
      this.addToWatchList()
    }
  }

  ordinal_suffix_of = (i)=>{
    let j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }
  
  componentDidMount = ()=>{
    this.info = setInterval(this.getStockInfo, 1000)
    this.watchingMarkers()
  }
  
  componentWillUnmount = ()=>{
    clearInterval(this.info)
  }
  
  render() {
    const { changePercent, companyName, latestPrice } = this.state

    const {
      ticker,
      e_score,
      e_percentile,
      s_score,
      s_percentile,
      g_score,
      g_percentile,
      total_score,
      total_percentile,
    } = this.props.stock

    if(!latestPrice){
      return <div><img src='https://media.giphy.com/media/SrwzXdhxMdgeA/giphy.gif' alt='Loader'></img></div>
    }
    return (
      <Segment inverted style={{ width: '600px' }}>

        <Grid centered columns={3} style={{paddingBottom: '5px'}}>
          {/* FIRST ROW */}
          <Grid.Row>
            <Grid.Column>
              {ticker}
              <br></br>
              {companyName}
            </Grid.Column>
            <Grid.Column></Grid.Column>
            <Grid.Column>
              <Grid columns={2}>
                <Grid.Column verticalAlign='middle' textAlign='right'>
                  {`${latestPrice}`}
                </Grid.Column>
                <Grid.Column floated='right' width={7}>
                  <Segment inverted color={changePercent < 0 ? 'red' : 'green'} size='mini' style={{ width: '55px' }}>
                    {`${Math.round(changePercent * 100) / 100}%`}
                  </Segment>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid.Row>

          {/* SECOND ROW */}
          <Grid.Row>
            <Grid.Column style={{ display: 'flex' }}>
              {`E: ${e_score} `} 
                |
              <Header inverted as='h6' style={{ paddingTop: '8px', paddingLeft: '5px', color: 'grey' }}>
                {` ${this.ordinal_suffix_of(e_percentile)}`}
              </Header>
            </Grid.Column>

            <Grid.Column style={{ display: 'flex', justifyContent: 'center' }}>
              {`S: ${s_score} `} 
                |
              <Header inverted as='h6' style={{ paddingTop: '8px', paddingLeft: '5px', color: 'grey' }}>
                {` ${this.ordinal_suffix_of(s_percentile)}`}
              </Header>
            </Grid.Column>

            <Grid.Column style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {`G: ${g_score} `} 
                |
              <Header inverted as='h6' style={{ paddingTop: '8px', paddingLeft: '5px', color: 'grey' }}>
                {` ${this.ordinal_suffix_of(g_percentile)}`}
              </Header>
            </Grid.Column>

          </Grid.Row>
        </Grid> 

        {/* DIVIDER */}
        <Divider fitted />
        
        {/* THIRD ROW */}
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column style={{paddingTop: '7px', display: 'flex'}}> 
              {`Total: ${total_score}` } | <Header inverted as='h6' style={{paddingTop: '8px', paddingLeft: '5px', color: 'grey'}}>{` ${this.ordinal_suffix_of(total_percentile)}`}</Header>
            </Grid.Column>
            <Grid.Column style={{paddingTop: '7px'}} textAlign='right'>
              <Icon name='plus circle' color={this.props.watchlist.find(w => w.ticker === this.props.stock.ticker) ? 'blue' : 'grey'} onClick={this.handleWatchingMarkers} />
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Segment>
    )
  }
}

function msp(state) {
  return {
    currentUser: state.user.currentUser,
    watchlist: state.stocks.watchlist
  }
}

export default connect(msp, { 
  setWatchlist, 
  getNews,
  removeFromWatchList })(Stock)