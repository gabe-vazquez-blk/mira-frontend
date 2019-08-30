import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Segment, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import MainGraph from '../components/MainGraph'
import SocialSentiment from '../components/SocialSentiment'
import Company from '../components/Company'
import Esg from '../components/Esg'

class StockShowPage extends Component {

  render() {
    const ticker = this.props.routerprops.match.params.ticker
    const showStock = this.props.stocks.find(stock => stock.ticker === ticker)

    if(!showStock){
      return <div className='home'><img src='https://media.giphy.com/media/SrwzXdhxMdgeA/giphy.gif' alt='Loader'></img></div>
    }

    return (
      <Route exact path={`/stock/${ticker}`} render={() => { 
        
        return (
          <div>
            <Grid columns={2}>
              <Grid.Column width={3}>
                {/* <Segment floated='left' inverted style={{width: '250px', height: '95vh'}}>
                  <List.Header> NEWS </List.Header>
                  <Segment inverted style={{ overflow: 'auto', height: '88vh'}}>
                    < News showStock={showStock}/>
                  </Segment>
                  </Segment> */}
                </Grid.Column>
                <Grid.Column width={11}>
                  <Grid centered columns={4}>
                    <Grid.Row>
                      <Segment inverted style={{width: '990px'}}>
                      < Company showStock={showStock}/>
                      </Segment>
                    </Grid.Row>
                    <Grid.Row>
                      <Segment inverted style={{width: '990px'}}>
                        <MainGraph showStock={showStock}/>
                      </Segment>
                    </Grid.Row>
                    <Grid.Row>
                      <Esg showStock={showStock}/>
                    </Grid.Row>
                    <Grid.Row>
                      <SocialSentiment showStock={showStock}/>
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
    stocks: state.stocks.stocks
  }
}

export default connect(msp)(StockShowPage)
