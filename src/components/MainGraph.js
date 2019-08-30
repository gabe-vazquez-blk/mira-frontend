import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Plot from 'react-plotly.js'
import { Menu } from 'semantic-ui-react'

class MainGraph extends Component {

  state = {
    symbol: null,
    x: null,
    close: null,
    high: null,
    low: null,
    open: null,
    interval: 'dynamic',
    activeItem:'1Day',
  }

  getPrices = ()=>{
    const { interval } = this.state
    const { currentStock, showStock } = this.props

    let ticker = ''
    if (showStock) {
      ticker = showStock.ticker
    } else {
      ticker = currentStock.ticker
    }

      fetch(`${process.env.REACT_APP_TEST_API_URL}/stock/${ticker}/chart/${interval}?token=${process.env.REACT_APP_TEST_API_KEY}`)
        .then(resp => resp.json())
        .then(prices => {
          let data = prices
          let time = "date" 

          if (interval === 'dynamic') {
            data = prices.data
            time = "minute"
          }

          this.setState({
            x: data.map(price => price[time]),
            close: data.map(price => price.close),
            high: data.map(price => price.high),
            low: data.map(price => price.low),
            open: data.map(price => price.open)
          })
        })

  }

  handleClick = (e, { name })=>{

    this.setState({
      interval: e.target.dataset.interval,
      activeItem: name
    })
  }

  componentDidMount(){
    this.getPrices()
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.interval !== this.state.interval){
      this.getPrices()
    }
    if(this.props.currentStock.ticker !== prevProps.currentStock.ticker){
      this.getPrices()
    }
    if ((prevProps.showStock !== this.props.showStock)) {
      this.getPrices()
    }
  }

  render() {
    const { x, close, high, low, open, interval, activeItem } = this.state
    return (
      <Fragment>

        <Menu inverted secondary style={{justifyContent: 'center'}}>
          <Menu.Item
            name ='1Day'
            active={activeItem === '1Day'}
            data-interval='dynamic'
            onClick={this.handleClick}/>
          <Menu.Item
            name='5Days'
            active={activeItem === '5Days'}
            data-interval='5d'
            onClick={this.handleClick}/>
          <Menu.Item
            name='1Month'
            active={activeItem === '1Month'}
            data-interval='1m'
            onClick={this.handleClick}/>
          <Menu.Item
            name='3Months'
            active={activeItem === '3Months'}
            data-interval='3m'
            onClick={this.handleClick} />
          <Menu.Item
            name='6Months'
            active={activeItem === '6Months'}
            data-interval='6m'
            onClick={this.handleClick} />
          <Menu.Item
            name='YTD'
            active={activeItem === 'YTD'}
            data-interval='ytd'
            onClick={this.handleClick}/>
          <Menu.Item
            name='1Year'
            active={activeItem === '1Year'}
            data-interval='1y'
            onClick={this.handleClick}/>
          <Menu.Item
            name='5Years'
            active={activeItem === '5Years'}
            data-interval='5y'
            onClick={this.handleClick} />
          <Menu.Item
            name='Max'
            active={activeItem === 'Max'}
            data-interval='max'
            onClick={this.handleClick}/>
        </Menu>

        <Plot
          data={[
            {
              x: x,
              close: close,
              decreasing: { line: { color: 'red' } },
              high: high,
              increasing: { line: { color: 'green' } },
              line: { color: 'rgba(31,119,180,1)' },
              low: low,
              open: open,
              type: 'candlestick',
              xaxis: 'x',
              yaxis: 'y'
            },
          ]}
          layout={{ 
            dragmode: 'zoom',
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            margin: {
              r: 0,
              t: 25,
              b: 40,
              l: 0
            },
            showlegend: false,
            xaxis: {
              autorange: true,
              title: interval === 'dynamic' ? 'Time' : 'Date',
              type: interval === 'dynamic' ? 'time' : 'date',
              showgrid: false
            },
            yaxis: {
              autorange: true,
              type: 'linear',
              showgrid: false
            },
          }}
        />
        
      </Fragment>
    )
  }
}

function msp(state) {
  return {
    currentStock: state.stocks.currentStock,
  }
}

export default connect(msp)(MainGraph)