import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, List, Segment, Icon } from 'semantic-ui-react'
import { removeFromWatchList, addToWatchList } from '../actions'
import { SHOWSTOCK } from '../types'

class Company extends Component {

  state = {
    symbol: null,
    companyName: null,
    exchange: null,
    industry: null,
    website: null,
    description: null,
    CEO: null,
    securityName: null,
    issueType: null,
    sector: null,
    employees: null,
    changePercent: 0,
    latestPrice: 0,
    ticker: null
  }

  getCompany = ()=>{
    let ticker = ''
    const{ currentStock, showStock } = this.props
    if(showStock){
      ticker = showStock.ticker
    } else{
      ticker = currentStock.ticker
    }
    fetch(`${process.env.REACT_APP_TEST_API_URL}/stock/${ticker}/company?token=${process.env.REACT_APP_TEST_API_KEY}`)
      .then(resp => {
        return resp.json()
      })
      .then(company => {
          this.setState({
            symbol: company.symbol,
            companyName: company.companyName,
            exchange: company.exchange,
            industry: company.industry,
            website: company.website,
            description: company.description,
            CEO: company.CEO,
            securityName: company.securityName,
            issueType: company.issueType,
            sector: company.sector,
            employees: company.employees,
            ticker: ticker
          })
        })
  }

  getStockInfo = () => {
    let ticker = ''
    const { currentStock, showStock } = this.props
    if (showStock) {
      ticker = showStock.ticker
    } else {
      ticker = currentStock.ticker
    }
    fetch(`${process.env.REACT_APP_TEST_API_URL}/stock/${ticker}/quote?token=${process.env.REACT_APP_TEST_API_KEY}`)
      .then(resp => resp.json())
      .then(stock => {
        this.setState({
          changePercent: stock.changePercent,
          latestPrice: stock.latestPrice
        })
      })
  }

  componentDidMount(){
    this.info = setInterval(()=>this.getStockInfo(), 1000)
    this.getCompany()
  }
  
  componentDidUpdate(prevProps, prevState){
    if(prevProps.currentStock.ticker !== this.props.currentStock.ticker || !this.state.symbol){
        this.getCompany()
      }
    if((prevProps.showStock !== this.props.showStock)){
      this.getCompany()
    }
  }

  componentWillUnmount(){
    clearInterval(this.info)
  }

  handleWatchingMarkers = ()=>{
    // console.log('CLICKED')
    const { watchlist, removeFromWatchList, addToWatchList, currentUser, showStock } = this.props
    const watchlistTickers = watchlist.map(stock => stock.ticker)
    if (watchlistTickers.includes(showStock.ticker)) {
      removeFromWatchList(showStock.id)
    } else {
      addToWatchList(showStock.id, currentUser.id, watchlist)
    }
  }


  render() {
    const {
      symbol,
      companyName,
      exchange,
      industry,
      website,
      CEO,
      issueType,
      sector,
      employees,
      changePercent,
      latestPrice
    } = this.state

    return (
      <div>

        <Grid columns={2}>
          <Grid.Column>
            <h1 style={{color: 'white', textAlign: 'left'}}>{companyName}</h1>
          </Grid.Column>
          <Grid.Column>
          <Grid columns={2}>
            <Grid.Column verticalAlign='middle' textAlign='right' width={13}>
              {`${latestPrice}`}
            </Grid.Column>
            <Grid.Column floated='right' width={3}>
              <Segment inverted color={changePercent < 0 ? 'red' : 'green'} size='mini' style={{ width: '55px' }}>
                {`${Math.round(changePercent * 100) / 100}%`}
              </Segment>
            </Grid.Column>
          </Grid>
          </Grid.Column>
        </Grid>

        <Grid columns={2} textAlign='left'>
          <Grid.Column>
            <List divided inverted relaxed>
              <List.Item>{`Symbol: ${symbol}`}</List.Item>
              <List.Item>{`Exhchange: ${exchange}`}</List.Item>
              <List.Item>{`Industry: ${industry}`}</List.Item>
              <List.Item>{`Website: ${website}`}</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <List divided inverted relaxed>
              <List.Item>{`CEO: ${CEO}`}</List.Item>
              <List.Item>{`Issue Type: ${issueType}`}</List.Item>
              <List.Item>{`Sector: ${sector}`}</List.Item>
              <List.Item>{`Employees: ${employees}`}</List.Item>
            </List>
          </Grid.Column>
        </Grid>
        {this.props.showStock ? 
          <Icon 
            name='plus circle' 
            color={this.props.watchlist.find(w => w.ticker === this.state.symbol) ? 'blue' : 'grey'} 
            style={{float: 'right', padding: '7px'}}
            onClick={this.handleWatchingMarkers}
            // onClick={()=>console.log('CLICKED')}
          />
          : null
        }
      </div>
    )
  }
}

function msp(state) {
  return {
    watchlist: state.stocks.watchlist,
    currentStock: state.stocks.currentStock,
    currentUser: state.user.currentUser,
  }
}

export default connect(msp, {
  removeFromWatchList,
  addToWatchList})(Company)