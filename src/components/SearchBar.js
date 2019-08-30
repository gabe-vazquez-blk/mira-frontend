import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { setsearchresult } from '../actions'
import { Search, Grid } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }

class SearchBar extends Component {

  state = initialState

  handleResultSelect = (e, { result }) =>{
    this.setState({ value: result.ticker })
    this.props.routerprops.history.push(`/stock/${result.ticker}`)
  } 

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.ticker)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.stocks, isMatch),
      })
    }, 300)
  }

  handleEnter = (e)=>{
    if(e.keyCode === 13){
      this.props.setsearchresult(e.target.value)
    }
  }


  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column style={{marginLeft: '360px'}}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results.map(result => ({ ...result, title: result.ticker }))}
            onKeyUp={this.handleEnter}
            value={value}
            {...this.props}
            placeholder='Ticker'
          />
        </Grid.Column>
      </Grid>
    )
  }
}

function msp(state) {
  return {
    stocks: state.stocks.stocks,
    searchresult: state.stocks.searchresult,
  }
}

export default connect(msp, { setsearchresult } )(SearchBar)