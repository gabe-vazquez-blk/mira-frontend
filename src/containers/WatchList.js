import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Segment, List, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import MainGraph from '../components/MainGraph'
import SocialSentiment from '../components/SocialSentiment'
import Company from '../components/Company'
import News from '../components/News'
import { setCurrentStock } from '../actions'
import Esg from '../components/Esg'

class Watchlist extends Component {

  handleClick = (stock)=>{
    this.props.setCurrentStock(stock)
  }
  
  renderWatchList = ()=>{
    const { watchlist } = this.props
    return watchlist.map(stock=>{
      return(
        <List.Item onClick={()=>this.handleClick(stock)}>
          {stock.ticker}
        </List.Item>
      )
    })
  }

  render() {
    if (!this.props.currentStock) {
      return <div style={{ color: "white" }}>Loading...</div>
    }
    return (
      <Route exact path="/watchlist" render={() => { 
        
        return (
          <div>
            <Grid columns={2}>
              <Grid.Column width={3} style={{marginRight: '80px'}}>
                <Segment floated='left' inverted style={{width: '250px', height: '95vh'}}>
                  <List.Header> STOCKS </List.Header>
                  <Segment inverted style={{ height: "40vh", overflow: 'auto'}}>
                      <List selection divided inverted relaxed>
                          {this.renderWatchList()}  
                      </List>
                  </Segment>
                  <List.Header> NEWS </List.Header>
                  <Segment inverted style={{ height: "40vh", overflow: 'auto' }}>
                    <News />
                  </Segment>
                </Segment>
                </Grid.Column>
                <Grid.Column width={11}>
                  <Grid centered columns={4}>
                    <Grid.Row>
                      <Segment inverted style={{width: '990px'}}>
                      <Company />
                      </Segment>
                    </Grid.Row>
                    <Grid.Row>
                      <Segment inverted style={{width: '990px'}}>
                        <MainGraph />
                      </Segment>
                    </Grid.Row>
                    <Grid.Row>
                      <Esg />
                    </Grid.Row>
                    <Grid.Row>
                      <SocialSentiment />
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
            </Grid>
          </div>
        )
      }} />
    )
  }
}

function msp(state) {
  return {
    watchlist: state.stocks.watchlist,
    currentStock: state.stocks.currentStock
  }
}

export default connect(msp, { setCurrentStock })(Watchlist)
