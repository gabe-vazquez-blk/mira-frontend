import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Grid, Header, Divider, Icon, Popup } from 'semantic-ui-react'
import { setCurrentStock } from '../actions'

class SocialSentiment extends Component {

  state = {
    sentiment: null,
    totalScores: null,
    positive: null,
    negative: null
  }

  getSentiment = ()=>{
    let ticker = ''
    const { currentStock, showStock } = this.props
    if (showStock) {
      ticker = showStock.ticker
    } else {
      ticker = currentStock.ticker
    }
    fetch(`${process.env.REACT_APP_TEST_API_URL}/stock/${ticker}/sentiment?token=${process.env.REACT_APP_TEST_API_KEY}`)
      .then(resp => resp.json())
      .then(stock => {
        this.setState({
          sentiment: stock.sentiment || '-',
          totalScores: stock.totalScores || '-',
          positive: stock.positive || '-',
          negative: stock.negative || '-'
        })
      })
  }

  componentDidMount = ()=>{
    this.getSentiment()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentStock.ticker !== this.props.currentStock.ticker || !this.state.sentiment) {
      this.getSentiment()
    }
    if ((prevProps.showStock !== this.props.showStock)) {
      this.getSentiment()
    }
  }

  render() {
    const { sentiment, totalScores, positive, negative } = this.state
    return (
      <div style={{ width: '990px' }}>
        <Segment inverted>

          <div style={{ wordSpacing: '5px' }}>
            <Header inverted textAlign='left' >
              Social Sentiment  <Popup
              trigger={<Icon color='grey' name='question circle outline' style={{ fontSize: '15px', marginTop: '-10px' }} />}
                content='Daily social sentiment data provided by StockTwits.'
              position='top center'
              size='tiny'
            />
            
            </Header>
          </div>

          <Divider></Divider>

          <Grid centered columns={4}>
            <Grid.Row>
              <Grid.Column>
                <h5 style={{ color: 'grey', marginBottom: '15px' }}>Sentiment</h5>
                <font size='6'>{Math.round(sentiment * 100) / 1000}</font>
              </Grid.Column>
              <Grid.Column >
                <h5 style={{ color: 'grey', marginBottom: '15px' }}>Total Scores</h5>
                <font size='6'>{totalScores}</font>
              </Grid.Column>
              <Grid.Column>
                <h5 style={{ color: 'grey', marginBottom: '15px' }}>Positive</h5>
                <font size='6'>{positive}</font>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <h5 style={{ color: 'grey', marginBottom: '15px' }}>Negative</h5>
                <font size='6'>{negative}</font>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

function msp(state) {
  return {
    watchlist: state.stocks.watchlist,
    currentStock: state.stocks.currentStock,
  }
}

export default connect(msp, { setCurrentStock })(SocialSentiment)